package io.projectriff.samples.shopping.inventoryapi.article;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;

import java.math.BigDecimal;
import java.util.Objects;

public class Article {
  @Id
  private final Long id;
  private final String sku;
  private final String name;
  private final String description;
  private final BigDecimal priceInUsd;
  private final String imageUrl;
  private final int quantity;

  @PersistenceConstructor
  @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
  public Article(@JsonProperty("sku") String sku,
                 @JsonProperty("name") String name,
                 @JsonProperty("description") String description,
                 @JsonProperty("priceInUsd") BigDecimal priceInUsd,
                 @JsonProperty("imageUrl") String imageUrl,
                 @JsonProperty("quantity") int quantity) {

    this(null, sku, name, description, priceInUsd, imageUrl, quantity);
  }

  Article(Long id, String sku, String name, String description, BigDecimal priceInUsd, String imageUrl, int quantity) {
    this.id = id;
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.priceInUsd = priceInUsd;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    ArticleValidator.validate(this);
  }

  public Long getId() {
    return id;
  }

  public String getSku() {
    return sku;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public BigDecimal getPriceInUsd() {
    return priceInUsd;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public int getQuantity() {
    return quantity;
  }

  Article withId(Long id) {
    return new Article(id, this.sku, this.name, this.description, this.priceInUsd, this.imageUrl, this.quantity);
  }

  @Override
  public String toString() {
    return "Article{" +
      "sku='" + sku + '\'' +
      ", name='" + name + '\'' +
      ", description='" + description + '\'' +
      ", priceInUsd=" + priceInUsd + '\'' +
      ", imageUrl=" + imageUrl + '\'' +
      ", quantity=" + quantity +
      '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Article article = (Article) o;
    return Objects.equals(sku, article.sku) &&
      Objects.equals(name, article.name) &&
      Objects.equals(description, article.description) &&
      Objects.equals(priceInUsd, article.priceInUsd) &&
      Objects.equals(imageUrl, article.imageUrl) &&
      Objects.equals(quantity, article.quantity);
  }

  @Override
  public int hashCode() {
    return Objects.hash(sku, name, description, priceInUsd, imageUrl, quantity);
  }
}
