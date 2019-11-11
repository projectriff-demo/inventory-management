package io.projectriff.samples.shopping.inventoryapi.article;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@Import(ArticleJdbcHelper.class)
@DataJdbcTest
@ActiveProfiles("test")
class ArticleRepositoryTest {

  @Autowired
  ArticleJdbcHelper jdbcHelper;

  @Autowired
  ArticleRepository repository;

  private Article article = new Article("some SKU", "some name", "description", BigDecimal.TEN);

  private Article otherArticle = new Article("some other SKU", "some other name", "other description", BigDecimal.ONE);

  @Test
  @DisplayName("Persists articles")
  void persist_articles() {
    Article article = repository.save(this.article);

    assertThat(jdbcHelper.find()).containsExactly(article);
  }

  @Test
  @DisplayName("Finds all persisted articles")
  void finds_all_articles() {
    jdbcHelper.save(article);
    jdbcHelper.save(otherArticle);

    assertThat(repository.findAll())
      .containsExactly(article, otherArticle);
  }

  @Test
  @DisplayName("Blows up if persisting an article with an existing SKU")
  void fails_persisting_duplicate_sku() {
    jdbcHelper.save(article);

    Article duplicate = new Article(article.getSku(), article.getName(), article.getDescription(), article.getPriceInUsd());

    assertThatThrownBy(() -> repository.save(duplicate))
      .hasCauseInstanceOf(DuplicateKeyException.class)
      .hasStackTraceContaining("UNIQUE_ARTICLE_SKU");
  }
}
