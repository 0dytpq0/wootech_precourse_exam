class Validator {
  IsValidMenu(menu = '', cantTry = []) {
    const noValidMenu = cantTry.includes(menu);
    if (noValidMenu) throw new Error('[ERROR]');
    return;
  }

  IsValidCoaches(coaches) {
    coaches.forEach((name) => {
      if (name.length < 2 || name.length > 4) throw new Error('[ERROR]');
    });
    if (coaches.length < 2 || coaches.length > 5) throw new Error('[ERROR]');
  }

  IsValidNotEatMenu(menus) {
    if (menus.length < 0 || menus.length > 2) throw new Error('[ERROR]');
  }

  IsDuplicateMenu(Recommanded, recommandMenu) {
    if (Recommanded.includes(recommandMenu)) throw new Error('[ERROR]');
  }
}

export default Validator;
