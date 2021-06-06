import { normalizedProducts } from '../../fixtures';
import { objectFromInitialData } from '../../utils/utils';

const defaultProducts = objectFromInitialData(normalizedProducts);

export default (products = defaultProducts, action) => {
  const { type } = action;

  switch (type) {
    default:
      return products;
  }
};
