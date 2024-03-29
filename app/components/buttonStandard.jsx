const Button = ({ buttonType, buttonText, ...props }) => {

  return (
    <button className={buttonType == 2 ? "btn2" : "btn"} {...props}>
        <div className="btn__bg">
            <span className="btn__bg__layer btn__bg__layer-first"></span>
            <span className="btn__bg__layer btn__bg__layer-second"></span>
            <span className="btn__bg__layer btn__bg__layer-third"></span>
        </div>
        <span className="btn__text-out">{buttonText}</span>
        <span className="btn__text-in">{buttonText}</span>
    </button>
  );
};

export default Button;