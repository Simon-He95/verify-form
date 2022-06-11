export function addStyle() {
  const styles = `
  :root{
    --regular-error-color: #f56c6c;
    --regular-input-color:#606266;
  }
  .regular-form{
    display:flex;
    flex-wrap:wrap;
  }
  .regular-form-field{
    display: flex;
    margin-bottom: 18px;
  }
  
  .regular-form-field__content{
    flex:1;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .regular-form-field__content input{
    width:100%;
    border-radius:5px;
    text-indent:10px;
    color:var(--regular-input-color);
  }
  .regular-form__inline > .regular-form-field{
    display: inline-flex;
  }
  .regular-form-field__error{
    padding-top:2px;
    font-size: 12px;
    color: var(--regular-error-color);
  }
  .regular-form-field__label.is-required:before{
    content:"*";
    color: var(--regular-error-color);
    margin-right: 4px
  }
  `
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = styles
  document.querySelector('head')?.appendChild(style)
}
