import {Component} from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './ContactForm.module.css';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.setState(ante => ({
      contacts: [...ante.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterLower = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(filterLower));
  }

  render() {
    const { filter, name, number } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        {/* <ContactList contacts={this.state.contacts} /> */}
        <ContactList contacts={filteredContacts} />
      </div>
    );
  }
}

export default App;
