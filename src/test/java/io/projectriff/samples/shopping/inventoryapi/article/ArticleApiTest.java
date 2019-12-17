package io.projectriff.samples.shopping.inventoryapi.article;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
class ArticleApiTest {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ArticleJdbcHelper jdbcHelper;

  @BeforeEach
  void prepare() {
    // ignore id field when manually serializing articles
    objectMapper.addMixIn(Article.class, ArticleMixIn.class);
  }

  @Test
  @DisplayName("persists articles via API")
  void persists_requested_article() throws Exception {
    Article article = new Article("some SKU", "some name", "some description", BigDecimal.ONE, null, 12);

    mockMvc.perform(post("/api/article")
      .contentType(APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(article)))
      .andExpect(status().isCreated());
  }

  @Test
  @DisplayName("lists articles via API")
  void lists_articles() throws Exception {
    List<Article> articles = Arrays.asList(
      new Article("sku 1", "name 1", "description 1", BigDecimal.ONE, null, 1),
      new Article("sku 2", "name 2", "description 2", BigDecimal.TEN, null, 2)
    );
    articles.forEach(jdbcHelper::save);

    mockMvc.perform(get("/api/article")
      .contentType(APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(content().json(String.format("{\n" +
        "  \"_embedded\": {\n" +
        "    \"articles\" : %s\n" +
        "  }\n" +
        "}", objectMapper.writeValueAsString(articles))));

  }

  @Test
  @DisplayName("deletes articles via API")
  void deletes_articles() throws Exception {
    Article article1 = new Article("sku 1", "name 1", "description 1", BigDecimal.ONE, null, 4);
    Article article2 = new Article("sku 2", "name 2", "description 2", BigDecimal.TEN, null, 7);
    Arrays.asList(article1, article2).forEach(jdbcHelper::save);

    mockMvc.perform(delete("/api/article/deleteBySku/?sku={sku}", article1.getSku()))
      .andExpect(status().isNoContent());
  }

  @Test
  @DisplayName("blows up if article is invalid")
  void fails_with_a_zeroed_price() throws Exception {
    mockMvc.perform(post("/api/article")
      .contentType(APPLICATION_JSON)
      .content("{}"))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.[*].property").value(is(Arrays.asList("sku", "name", "description", "priceInUsd"))))
      .andExpect(jsonPath("$.[*].reason").value(is(Arrays.asList(
        "expected property not to be blank",
        "expected property not to be blank",
        "expected property not to be blank",
        "expected property not to be null"))));
  }
}
