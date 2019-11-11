package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@TestConfiguration
class TestJdbcConfiguration {

  @Bean
  ArticleJdbcHelper articleJdbcHelper(JdbcTemplate jdbcTemplate) {
    return new ArticleJdbcHelper(jdbcTemplate);
  }
}

@Component
class ArticleJdbcHelper {

  private final JdbcTemplate jdbcTemplate;

  public ArticleJdbcHelper(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public void save(Article article) {
    jdbcTemplate.update(
      "INSERT INTO Article(`sku`,`name`,`description`,`price_in_usd`) VALUES(?,?,?,?)",
      article.getSku(), article.getName(), article.getDescription(), article.getPriceInUsd());
  }

  public List<Article> find() {
    return jdbcTemplate.query("SELECT `sku`,`name`,`description`,`price_in_usd` FROM Article", (resultSet, i) -> new Article(
      resultSet.getString("sku"),
      resultSet.getString("name"),
      resultSet.getString("description"),
      resultSet.getBigDecimal("price_in_usd")));
  }
}

