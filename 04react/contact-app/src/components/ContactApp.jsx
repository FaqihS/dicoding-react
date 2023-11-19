import React from "react";
import ContactList from "./ContactList";
import {getData} from "../utils/data"
import ContactInput from "./ContactInput";


// function ContactApp(){
//   const contacts = getData()

//   return(
//   <div className="contact-app">
//       <h1>Daftar Kontak</h1>
//       <ContactList contacts={contacts} />
//     </div>
//   )
// }

class ContactApp extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      contacts : getData()
    }

    this.onDelete = this.onDelete.bind(this)
    this.addContact = this.addContact.bind(this)
  }
  onDelete(id){
    const contacts = this.state.contacts.filter(c=>c.id !==id)
    this.setState({contacts})
  }
  addContact({name,tag}){
    this.setState((prevState)=>{
    return{
      contacts : [
        ...prevState.contacts,
        {
          id: +new Date(),
          name,
          tag,
          imageUrl: '/images/default.jpg',
        }
      ]
    }

    })
  }

  render(){
    return (
    <div className="contact-app">
        <h1>Aplikasi Kontak</h1>
        <h2>Tambah Kontak</h2>
        <ContactInput addContact={this.addContact} />
        <h2>Daftar Kontak</h2>
        <ContactList contacts={this.state.contacts} onDelete={this.onDelete}/>
      </div>
    )
  }

}

export default ContactApp
