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

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
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
    Article article = new Article("some SKU", "some name", "some description", BigDecimal.ONE);

    mockMvc.perform(post("/api/article")
      .contentType(APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(article)))
      .andExpect(status().isCreated());
  }

  @Test
  @DisplayName("lists articles via API")
  void lists_articles() throws Exception {
    List<Article> articles = Arrays.asList(
      new Article("sku 1", "name 1", "description 1", BigDecimal.ONE),
      new Article("sku 2", "name 2", "description 2", BigDecimal.TEN)
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
}
