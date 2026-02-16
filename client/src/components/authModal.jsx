const AuthModal = ({setModalType}) => {
    return (
    <div className='auth-container'>
        <div className='auth-hello'>
            <span className='auth-hello-title'>Рады видеть вас снова!</span>
            <span className='auth-hello-text'>Богатство природы для вашего здоровья</span>
        </div>
        <form className="auth-form">
            <span className="auth-form-label">Авторизация</span>
            <div className="form-group">
                <label>Почта</label>
                <input type="email" placeholder="example@mail.com" />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" placeholder="Введите свой пароль"/>
                <a href="#" className="pass-info">Забыли пароль?</a>
            </div>
            <button type="submit" className="login-btn">Войти</button>
            <div className="modal-footer">
                <span>Нет аккаунта? <a href="#" onClick={(e) => {
                        e.preventDefault(); // чтобы страница не дергалась
                        setModalType('registerModal'); 
                    }}>Зарегистрируйтесь</a>
                </span>   
            </div>
        </form>
    </div>
)
}

export default AuthModal;