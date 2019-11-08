package io.projectriff.samples.shopping.inventoryapi.article;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class ArticleApiTest {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Autowired
  MockMvc mockMvc;

  @Test
  void persists_through_http() throws Exception {
    Article article = new Article("some SKU", "some name", "some description", BigDecimal.ONE);

    mockMvc.perform(post("/api/article")
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(article)))
      .andExpect(status().isCreated());
  }
}
