package io.projectriff.samples.shopping.inventoryapi.exceptions;

import java.util.Objects;

public class PropertyValidationError {

  private final String property;
  private final String reason;

  public PropertyValidationError(String property, String reason) {
    this.property = property;
    this.reason = reason;
  }

  public String getProperty() {
    return property;
  }

  public String getReason() {
    return reason;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    PropertyValidationError that = (PropertyValidationError) o;
    return Objects.equals(property, that.property) &&
      Objects.equals(reason, that.reason);
  }

  @Override
  public int hashCode() {
    return Objects.hash(property, reason);
  }

  @Override
  public String toString() {
    return "EntityValidationError{" +
      "property='" + property + '\'' +
      ", reason='" + reason + '\'' +
      '}';
  }
}
