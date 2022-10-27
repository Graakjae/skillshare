import React, { FC, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Skill } from "../models/Skill";
import { User } from "../models/User";

export const Filter: FC<User> = ({}) => {
  const CATEGORIES = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  function ProductFilters() {
    const { categories, onFilterChange } = props;

    return (
      <section className="filters" aria-labelledby="filters-header">
        <header id="filters-header">{"Filters"}</header>

        <ul>
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  onChange={onFilterChange}
                  type="checkbox"
                  value={category}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  function Filter() {
    const [state, setState] = useState({
      products: PRODUCTS,
      filters: new Set(),
    });

    const handleFilterChange = useCallback(
      (event) => {
        setState((previousState) => {
          let filters = new Set(previousState.filters);
          let products = PRODUCTS;

          if (event.target.checked) {
            filters.add(event.target.value);
          } else {
            filters.delete(event.target.value);
          }

          if (filters.size) {
            products = products.filter((product) => {
              return filters.has(product.category);
            });
          }

          return {
            filters,
            products,
          };
        });
      },
      [setState]
    );

    return (
      <main>
        <ProductFilters
          categories={CATEGORIES}
          onFilterChange={handleFilterChange}
        />
        <ProductsList products={state.products} />
      </main>
    );
  }
};
