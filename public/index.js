const userCreateForm = document.getElementById("user-create-form")
const userCreateSubmitButton = userCreateForm.querySelector("button[type='submit']")

const userEmailAddressInputs = document.getElementsByName('email');
const userPasswordInputs = document.getElementsByName('password');
const userUserName = document.getElementsByName('username');
const userBirthMonth = document.getElementsByName('birthMonth');
const userBirthYear = document.getElementsByName('birthYear');
const phoneNumber = document.getElementById('phone');
const socialAccount = document.getElementById('social');
const contactPreference = document.getElementsByName('communication');
const devices = document.getElementsByName('devices');
const loginRights = document.getElementById('loginrights');
const favColor = document.getElementById('favcolor');
const pokemon = document.getElementById('pokemon');

userCreateSubmitButton.addEventListener( "click" , handleUserSubmit );

function handleUserSubmit( event ){
  event.preventDefault();

  let userInfo = {};
  if( userEmailAddressInputs[0].value &&
      userEmailAddressInputs[0].value === userEmailAddressInputs[1].value ){
        userInfo.email = userEmailAddressInputs[0].value;
  }else{
    if( !userEmailAddressInputs[0].value ){
      alert('Enter Email Address');
      return
    }else{
      alert('Make sure email addresses match')
      return
    }
  }

  if( userPasswordInputs[0].value &&
      userPasswordInputs[0].value.length >= 8 &&
      userPasswordInputs[0].value === userPasswordInputs[1].value ){
        userInfo.password = userPasswordInputs[0].value;
  }else{
    if( !userPasswordInputs[0].value ){
      alert('Enter Password');
      return
    }else if( userPasswordInputs[0].value.length < 8 ){
      alert('Password needs to be atleast 8 characters long')
      return
    }else{
      alert('passwords need to match')
    }
  }

  if( userUserName[0].value ){
    userInfo.userName = userUserName[0].value;
  }else{
    alert('Please enter a username')
  }

  if( userBirthMonth[0].value && userBirthYear[0].value ){
    userInfo.birthday = userBirthMonth[0].value + userBirthYear[0].value;
  }

  userInfo.phoneNum = phoneNumber.value;
  userInfo.social = socialAccount.value;
  
  if( contactPreference[0].checked ){
    userInfo.contactPref = contactPreference[0].value;
  }else{
    userInfo.contactPref = contactPreference[1].value;
  }

  let deviceList = []
  devices.forEach( device => {
    if ( device.checked ){
      deviceList.push(device.value);
    }
  })

  userInfo.devices = deviceList;

  userInfo.login = loginRights.value;

  userInfo.color = favColor.value;

  userInfo.pokemon = pokemon.value;

  userInfoJson = JSON.stringify(userInfo);

  postUserInfo( userInfoJson );

  console.log(userInfo);
}

function postUserInfo( userInfoJson ){

  fetch( `./api/user/` , {
    body: userInfoJson,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
      console.log(response)
      if( response.status === 201 ){
        return response.json()
      }else if ( response.status === 409){
        console.log('dont want to do the next part')
        throw new Error( 'this username is already taken' );
      }
    }).then( data => {
      console.log('its the info', data)
      alert('your username is signed up correctly')
      })
      .catch(error => {
        console.log( error )
        alert('UserName already taken. please try a new username')
      })
    

}
