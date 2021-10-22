const inputRegister = document.querySelector("#register");
        const inputLogin = document.querySelector("#login");
        const formRegister = document.querySelector(".register__form");
        const formLogin = document.querySelector(".login__form");
        const buttonRegister = document.querySelector("#submitRegister");
        const buttonLogin = document.querySelector('#submitLogin');
        const heading = document.querySelector('.heading');
        const buttonLogOut = document.querySelector('#logOut');
        const buttonClear = document.querySelector('#clearLocal')

        function addInput() {
            localStorage.setItem("name", inputRegister.value);
        }

        function showLogin() {
            if(localStorage.getItem("name") === null || localStorage.getItem("name") === "") {
                heading.classList.add('hidden');
                formRegister.classList.remove('hidden');
                formLogin.classList.add('hidden');
            } else {                
                heading.classList.add('hidden');
                formRegister.classList.add('hidden');
                formLogin.classList.remove('hidden');
                localStorage.setItem("login", "false");
            }            
        }

        function loginHandler() {
           if (localStorage.getItem("name") === inputLogin.value) {
                formLogin.classList.add('hidden')
                heading.classList.remove('hidden')
                localStorage.setItem("login", "true")                
            }
            else {
                console.log("Bad login")
            }
        }

        buttonRegister.addEventListener(
            'click',
            () => {
                addInput();
                showLogin();
            }
        )

        buttonLogin.addEventListener('click',loginHandler);

        buttonLogOut.addEventListener('click',showLogin);

        buttonClear.addEventListener('click',
            () => {
            localStorage.clear();
            localStorage.setItem("login", "false")
            showLogin();
        })

        function showLogged() {
            if(localStorage.getItem("login") === "true") {
                formLogin.classList.add('hidden');
                heading.classList.remove('hidden');
                formRegister.classList.add('hidden');
            }
            else {
                showLogin();
            }
        }

        showLogged();
        
        