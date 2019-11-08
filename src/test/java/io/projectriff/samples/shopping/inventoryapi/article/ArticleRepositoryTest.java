package io.projectriff.samples.shopping.inventoryapi.article;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DataJdbcTest
@ActiveProfiles("test")
class ArticleRepositoryTest {

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Autowired
  ArticleRepository repository;

  private Article article = new Article("some SKU", "some name", "description", BigDecimal.TEN);

  @Test
  @DisplayName("Persists articles")
  void persist_articles() {
    Article article = repository.save(this.article);

    List<Article> articles = jdbcTemplate.query("SELECT `sku`,`name`,`description`,`price_in_usd` FROM Article", (resultSet, i) -> new Article(
      resultSet.getString("sku"),
      resultSet.getString("name"),
      resultSet.getString("description"),
      resultSet.getBigDecimal("price_in_usd")));

    assertThat(articles).containsExactly(article);
  }

  @Test
  @DisplayName("Blows up if persisting an article with an existing SKU")
  void fails_persisting_duplicate_sku() {
    jdbcTemplate.update(
      "INSERT INTO Article(`sku`,`name`,`description`,`price_in_usd`) VALUES(?,?,?,?)",
      article.getSku(), article.getName(), article.getDescription(), article.getPriceInUsd());

    Article duplicate = new Article(article.getSku(), article.getName(), article.getDescription(), article.getPriceInUsd());

    assertThatThrownBy(() -> repository.save(duplicate))
      .hasCauseInstanceOf(DuplicateKeyException.class)
      .hasStackTraceContaining("UNIQUE_ARTICLE_SKU");
  }
}
