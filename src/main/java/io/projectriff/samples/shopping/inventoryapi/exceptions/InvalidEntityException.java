package io.projectriff.samples.shopping.inventoryapi.exceptions;

import java.util.List;

public class InvalidEntityException extends IllegalStateException {

  private final List<PropertyValidationError> propertyErrors;

  public InvalidEntityException(List<PropertyValidationError> propertyErrors) {
    this.propertyErrors = propertyErrors;
  }

  public List<PropertyValidationError> getPropertyErrors() {
    return propertyErrors;
  }
}
