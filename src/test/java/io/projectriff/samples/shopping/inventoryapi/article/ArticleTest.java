package io.projectriff.samples.shopping.inventoryapi.article;

import io.projectriff.samples.shopping.inventoryapi.exceptions.InvalidEntityException;
import io.projectriff.samples.shopping.inventoryapi.exceptions.PropertyValidationError;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ArticleTest {

  @Test
  @DisplayName("Rejects article with blank sku")
  void rejects_article_with_blank_sku() {
    assertThatThrownBy(() -> {
      new Article("  ", "name 1", "description 1", BigDecimal.ONE, null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("sku", "expected property not to be blank")));
  }

  @Test
  @DisplayName("Rejects article with blank name")
  void rejects_article_with_blank_name() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "", "description 1", BigDecimal.ONE, null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("name", "expected property not to be blank")));
  }

  @Test
  @DisplayName("Rejects article with blank description")
  void rejects_article_with_blank_description() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", null, BigDecimal.ONE, null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("description", "expected property not to be blank")));
  }

  @Test
  @DisplayName("Rejects article with null price")
  void rejects_article_with_empty() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", "description 1", null, null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("priceInUsd", "expected property not to be null")));
  }

  @Test
  @DisplayName("Rejects article with zeroed price")
  void rejects_article_with_zeroed_price() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", "description 1", BigDecimal.ZERO, null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("priceInUsd", "expected property to be at least 0.01, got: 0")));
  }

  @Test
  @DisplayName("Rejects article with negative price")
  void rejects_article_with_negative_price() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", "description 1", new BigDecimal(-0.1), null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("priceInUsd", "expected property to be at least 0.01, got: -0.1")));
  }

  @Test
  @DisplayName("Rejects article with too small price")
  void rejects_article_with_too_small_price() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", "description 1", new BigDecimal(0.001), null, 4);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("priceInUsd", "expected property to be at least 0.01, got: 0.001")));
  }

  @Test
  @DisplayName("Rejects article with negative quantity")
  void rejects_article_with_negative_quantity() {
    assertThatThrownBy(() -> {
      new Article("sku 1", "name 1", "description 1", BigDecimal.ONE, null, -1);
    })
      .isInstanceOf(InvalidEntityException.class)
      .hasFieldOrPropertyWithValue("propertyErrors", singletonList(newPropertyError("quantity", "expected property to be at least 0, got: -1")));
  }

  private PropertyValidationError newPropertyError(String description, String reason) {
    return new PropertyValidationError(description, reason);
  }
}
