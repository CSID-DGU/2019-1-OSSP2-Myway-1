const usernameInput = document.querySelector('#input-username');
const passwordIput = document.querySelector('#input-password');
const confirmBtn = document.querySelector('#btn-confirm');
const alertCtrl = documnet.querySelector('ion-alert-controller');

confirmBtn.addEventListener('click', () =>{
    const enteredName = usernameInput.value;
    const eneteredPW = passwordInput.value;

    if(eneterdName.trim().length <= 0 || enteredPw <=0 ){
        alertCtrl.create({
            message: "please enter valid username and password",
            header: "invalid inpuys",
            buttons: ['okay']
        }). then(alertElement => {
            alertElement.present();
        });
        return;
    }
})
