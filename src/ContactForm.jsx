import { useState } from 'react';

function ContactForm(){
    const[name, SetName] = useState('');
    const[email, SetEmail] = useState('');
    const[message, SetMsg] = useState('');
    const[feedback, SetFB] = useState('');

    function handleSubmit(){
        if(name.trim() == '' || email.trim() == '' || message.trim() == ''){
            SetFB('De ce e gol? Ai uitat cum sa scrii?')
            return;
        }

        SetFB('Multumim, ' + name + '!')
        SetName('');
        SetEmail('');
        SetMsg('');
    }

    return(
        <div>
            <h4>Formular de Contact</h4>


            <input
                type="text"
                placeholder="nume"
                value={name}
                onChange={(e) => SetName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
            />

            <input
                placeholder="message"
                value={message}
                onChange={(e) => SetMsg(e.target.value)}
            />

            <button style={{ backgroundColor:'blue', color: 'white', border: '1px solid black', padding: '5px 10px', cursor: 'pointer' }} onClick={handleSubmit}>Trimite</button>
        
        <p>{feedback}</p>
        </div>
    );

}

export default ContactForm;