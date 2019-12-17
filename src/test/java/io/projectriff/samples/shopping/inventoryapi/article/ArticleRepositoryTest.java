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

  private Article article = new Article("some SKU", "some name", "description", BigDecimal.TEN, null, 12);

  private Article otherArticle = new Article("some other SKU", "some other name", "other description", BigDecimal.ONE, null, 3);

  private Article articleWithImage = new Article("yet another SKU", "yet another name", "yet another description", BigDecimal.ONE, "https://giphygifs.s3.amazonaws.com/media/kKdgdeuO2M08M/giphy.gif", 1);

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
    jdbcHelper.save(articleWithImage);

    assertThat(repository.findAll())
      .containsExactly(article, otherArticle, articleWithImage);
  }

  @Test
  @DisplayName("Finds articles by SKU")
  void find_article_by_sku() {
    jdbcHelper.save(article);
    jdbcHelper.save(otherArticle);

    Article found = repository.findBySku(article.getSku());

    assertThat(repository.findAll()).containsExactly(article, otherArticle);
    assertThat(found.getSku()).isEqualTo(article.getSku());
  }

  @Test
  @DisplayName("Updates quantity for articles by SKU")
  void update_article_by_sku() {
    jdbcHelper.save(article);
    jdbcHelper.save(otherArticle);

    int count = repository.updateQuantityBySku(article.getSku(), 12, 11);

    Article updatedArticle = new Article("some SKU", "some name", "description", BigDecimal.TEN, null, 11);

    assertThat(repository.findAll()).containsExactly(updatedArticle, otherArticle);
    assertThat(count).isEqualTo(1);
  }

@Test
  @DisplayName("Deletes articles by SKU")
  void deletes_article_by_sku() {
    jdbcHelper.save(article);
    jdbcHelper.save(otherArticle);

    repository.deleteBySku(article.getSku());

    assertThat(repository.findAll()).containsExactly(otherArticle);
  }

  @Test
  @DisplayName("Persists article with image URL")
  void persists_articles_with_image_urls() {
    Article article = repository.save(this.articleWithImage);

    assertThat(jdbcHelper.find()).containsExactly(article);
  }

  @Test
  @DisplayName("Blows up if persisting an article with an existing SKU")
  void fails_persisting_duplicate_sku() {
    jdbcHelper.save(article);

    Article duplicate = new Article(
      article.getSku(),
      article.getName(),
      article.getDescription(),
      article.getPriceInUsd(),
      article.getImageUrl(),
      article.getQuantity()
    );

    assertThatThrownBy(() -> repository.save(duplicate))
      .hasCauseInstanceOf(DuplicateKeyException.class)
      .hasStackTraceContaining("UNIQUE_ARTICLE_SKU");
  }
}
