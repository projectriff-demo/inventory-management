package io.projectriff.samples.shopping.inventoryapi;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class InventoryApiApplicationTests {

	@Test
  @DisplayName("application context does not blow up")
	void context_loads() {
	}

}
