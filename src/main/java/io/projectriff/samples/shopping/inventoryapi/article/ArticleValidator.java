package io.projectriff.samples.shopping.inventoryapi.article;

import io.projectriff.samples.shopping.inventoryapi.exceptions.InvalidEntityException;
import io.projectriff.samples.shopping.inventoryapi.exceptions.PropertyValidationError;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

class ArticleValidator {

  public static void validate(Article article) {
    List<PropertyValidationError> errors = new ArrayList<>(5);
    if (isBlank(article.getSku())) {
      errors.add(new PropertyValidationError("sku", notBlankMessage()));
    }
    if (isBlank(article.getName())) {
      errors.add(new PropertyValidationError("name", notBlankMessage()));
    }
    if (isBlank(article.getDescription())) {
      errors.add(new PropertyValidationError("description", notBlankMessage()));
    }
    BigDecimal price = article.getPriceInUsd();
    if (price == null) {
      errors.add(new PropertyValidationError("priceInUsd", notNullMessage()));
    } else {
      String formattedPrice = NumberFormat.getInstance(Locale.US).format(price);
      if (price.compareTo(BigDecimal.ZERO) <= 0) {
        errors.add(new PropertyValidationError("priceInUsd", minValueMessage("0.01", formattedPrice)));
      } else if (price.compareTo(new BigDecimal(0.01)) < 0) {
        errors.add(new PropertyValidationError("priceInUsd", minValueMessage("0.01", formattedPrice)));
      }
    }
    int quantity = article.getQuantity();
    if (quantity < 0) {
      String formattedQuantity = String.format("%d", quantity);
      errors.add(new PropertyValidationError("quantity", minValueMessage("0", formattedQuantity)));
    }
    if (!errors.isEmpty()) {
      throw new InvalidEntityException(errors);
    }
  }

  private static boolean isBlank(String value) {
    if (value == null) {
      return true;
    }
    return value.trim().equals("");
  }

  private static String notBlankMessage() {
    return "expected property not to be blank";
  }

  private static String notNullMessage() {
    return "expected property not to be null";
  }

  private static String minValueMessage(String minValue, String actualValue) {
    return String.format("expected property to be at least %s, got: %s", minValue, actualValue);
  }
}
