package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "article")
public interface ArticleRepository extends CrudRepository<Article, Long> {

  @Query("SELECT id,sku,name,description,price_in_usd,image_url,quantity FROM article WHERE sku = :sku")
  Article findBySku(@Param("sku") String sku);

  @RestResource(exported = false)
  @Modifying
  @Query("UPDATE article SET quantity = :to WHERE sku = :sku AND quantity = :from")
  int updateQuantityBySku(@Param("sku") String sku, @Param("from") int from, @Param("to") int to);

  @RestResource(exported = false)
  @Modifying
  @Query("DELETE FROM article WHERE sku = :sku")
  void deleteBySku(@Param("sku") String sku);
}
