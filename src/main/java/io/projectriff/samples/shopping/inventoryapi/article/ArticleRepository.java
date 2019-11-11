package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "article")
public interface ArticleRepository extends CrudRepository<Article, Long> {

  @Modifying
  @Query("DELETE FROM Article WHERE sku = :sku")
  void deleteBySku(@Param("sku") String sku);
}
