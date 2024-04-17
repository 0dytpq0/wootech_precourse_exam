const calculateWeekDiscount = (template, menus) => {
  let discount = 0;

  template.forEach((quantity, menu) => {
    menus.forEach((data) => {
      if (data.includes(menu)) discount += 2023 * data[1];
    });
  });

  return discount;
};

const calculateMenuAmount = (menu, template) => {
  const amount = menu.reduce((acc, menu) => {
    return acc + template.get(menu[0]) * menu[1];
  }, 0);

  return amount;
};

export { calculateWeekDiscount, calculateMenuAmount };
