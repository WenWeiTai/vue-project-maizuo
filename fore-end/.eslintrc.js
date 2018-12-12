// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 关闭禁止末尾分号的报错
    'semi': 'off',

    //关闭末尾存在空行
    // 'eol-last': 'off',

    //关闭禁止行尾空格
    // 'no-trailing-spaces': 'off',

    // 关闭缩进
    'indent': 'off',

    //关闭双引号限制
    'quotes': 'off',

    //禁止不能用new
    'no-new': 'off'
  }
}
