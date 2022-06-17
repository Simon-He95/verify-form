export function addStyle() {
  const styles = `
  :root{
    --verify-error-color: #f56c6c;
    --verify-input-color:#606266;
  }
  .verify-form{
    display:flex;
    flex-wrap:wrap;
  }
  .verify-form-field{
    display: flex;
    margin-bottom: 18px;
    align-items:center;
  }
  
  .verify-form-field__content{
    flex:1;
    box-sizing: border-box;
    padding: 0 10px;
    position:relative;
  }
  .verify-form-field__content input{
    width:100%;
    border-radius:5px;
    text-indent:10px;
    color:var(--verify-input-color);
  }
  .verify-form__inline > .verify-form-field{
    display: inline-flex;
  }
  .verify-form-field__error{
    position:absolute;
    left:50%;
    top:100%;
    transform:translateX(-50%);
    padding-top:2px;
    font-size: 12px;
    color: var(--verify-error-color);
  }
  .verify-form-field__label.is-required:before{
    content:"*";
    color: var(--verify-error-color);
    margin-right: 4px
  }
  `
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = styles
  document.querySelector('head')?.appendChild(style)
}
