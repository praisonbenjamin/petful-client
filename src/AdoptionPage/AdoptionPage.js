import React from 'react';
import PetSelect from '../PetSelect/PetSelect';
import ApiService from '../ApiService/ApiService';
import Queue from '../Queue/Queue';
import './AdoptionPage.css';

const names = [
  'Adam',
  'Alex',
  'Aaron',
  'Ben',
  'Carl',
  'Dan',
  'David',
  'Edward',
  'Fred',
  'Frank',
  'George',
  'Hal',
  'Hank',
  'Ike',
  'John',
  'Jack',
  'Joe',
  'Larry',
  'Monte',
  'Matthew',
  'Mark',
  'Nathan',
  'Otto',
  'Paul',
  'Peter',
  'Roger',
  'Roger',
  'Steve',
  'Thomas',
  'Tim',
  'Ty',
  'Victor',
  'Walter',
];

const lastNames = [
  'Anderson',
  'Ashwoon',
  'Aikin',
  'Bateman',
  'Bongard',
  'Bowers',
  'Boyd',
  'Cannon',
  'Cast',
  'Deitz',
  'Dewalt',
  'Ebner',
  'Frick',
  'Hancock',
  'Haworth',
  'Hesch',
  'Hoffman',
  'Kassing',
  'Knutson',
  'Lawless',
  'Lawicki',
  'Mccord',
  'McCormack',
  'Miller',
  'Myers',
  'Nugent',
  'Ortiz',
  'Orwig',
  'Ory',
  'Paiser',
  'Pak',
  'Pettigrew',
  'Quinn',
  'Quizoz',
  'Ramachandran',
  'Resnick',
  'Sagar',
  'Schickowski',
  'Schiebel',
  'Sellon',
  'Severson',
  'Shaffer',
  'Solberg',
  'Soloman',
  'Sonderling',
  'Soukup',
  'Soulis',
  'Stahl',
  'Sweeney',
  'Tandy',
  'Trebil',
  'Trusela',
  'Trussel',
  'Turco',
  'Uddin',
  'Uflan',
  'Ulrich',
  'Upson',
  'Vader',
  'Vail',
  'Valente',
  'Van Zandt',
  'Vanderpoel',
  'Ventotla',
  'Vogal',
  'Wagle',
  'Wagner',
  'Wakefield',
  'Weinstein',
  'Weiss',
  'Woo',
  'Yang',
  'Yates',
  'Yocum',
  'Zeaser',
  'Zeller',
  'Ziegler',
  'Bauer',
  'Baxster',
  'Casal',
  'Cataldi',
  'Caswell',
  'Celedon',
  'Chambers',
  'Chapman',
  'Christensen',
  'Darnell',
  'Davidson',
  'Davis',
  'DeLorenzo',
  'Dinkins',
  'Doran',
  'Dugelman',
  'Dugan',
  'Duffman',
  'Eastman',
  'Ferro',
  'Ferry',
  'Fletcher',
  'Fietzer',
  'Hylan',
  'Hydinger',
  'Illingsworth',
  'Ingram',
  'Irwin',
  'Jagtap',
  'Jenson',
  'Johnson',
  'Johnsen',
  'Jones',
  'Jurgenson',
  'Kalleg',
  'Kaskel',
  'Keller',
  'Leisinger',
  'LePage',
  'Lewis',
  'Linde',
  'Lulloff',
  'Maki',
  'Martin',
  'McGinnis',
  'Mills',
  'Moody',
  'Moore',
  'Napier',
  'Nelson',
  'Norquist',
  'Nuttle',
  'Olson',
  'Ostrander',
  'Reamer',
  'Reardon',
  'Reyes',
  'Rice',
  'Ripka',
  'Roberts',
  'Rogers',
  'Root',
  'Sandstrom',
  'Sawyer',
  'Schlicht',
  'Schmitt',
  'Schwager',
  'Schutz',
  'Schuster',
  'Tapia',
  'Thompson',
  'Tiernan',
  'Tisler',
];

export default class AdoptionPage extends React.Component {
  state = {
    pets: { cats: [], dogs: [] },
    people: [],
    name: '',
    adoptionMessage: false,
    waiting: false,
    inLine: false,
    atFront: false,
  };
  componentDidMount() {
    ApiService.getAllPets()
      .then((pets) => {
        this.setState({ pets });
      })
      .catch((error) => this.setState({ error }));
    ApiService.getAllPeople()
      .then((people) => {
        this.setState({ people });
      })
      .catch((error) => this.setState({ error }));
  }

  dqPair = () => {
    let pets = ['cat', 'dog'];
    let pet = pets[Math.floor(Math.random() * pets.length)];
    ApiService.dequeuePet(pet).then(() => {
      ApiService.getAllPets()
        .then((pets) => {
          this.setState({ pets });
        })
        .catch((error) => this.setState({ error }));
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    ApiService.queuePerson(this.state.name).then(() => {
      ApiService.getAllPeople()
        .then((people) => {
          this.setState({ people, inLine: true, waiting: true });
        })
        .catch((error) => this.setState({ error }));
    });

    this.moveQueue();
  };

  handleAdopt = (type) => {
    this.setState({ adoptionMessage: true });
    setTimeout(() => {
      ApiService.dequeuePet(type)
        .then(() => {
          ApiService.getAllPets()
            .then((pets) => {
              this.setState({ pets });
            })
            .catch((error) => this.setState({ error }));
        })
        .then(() => {
          ApiService.dequeuePerson().then(() => {
            ApiService.getAllPeople()
              .then((people) => {
                this.setState({
                  people,
                  name: '',
                  inLine: false,
                  atFront: false,
                  adoptionMessage: false,
                });
              })
              .catch((error) => this.setState({ error }));
          });
        });
    }, 3000);
  };

  moveQueue = () => {
    this.interval = setInterval(() => {
      ApiService.dequeuePerson()
        .then(() => {
          this.dqPair();
        })
        .then(() => {
          ApiService.getAllPeople()
            .then((people) => {
              this.setState({ people });
              if (people[0] === this.state.name) {
                clearInterval(this.interval);
                this.fillQueue();
              }
            })
            .catch((error) => this.setState({ error }));
        });
    }, 5000);
  };

  fillQueue = () => {
    this.interval = setInterval(() => {
      let first = names[Math.floor(Math.random() * names.length)];
      let last = lastNames[Math.floor(Math.random() * lastNames.length)];
      ApiService.queuePerson(`${first} ${last}`).then(() => {
        ApiService.getAllPeople()
          .then((people) => {
            this.setState({ people });
            if (people.length < 5) {
              clearInterval(this.interval);
              this.setState({ atFront: true, waiting: false });
            }
          })
          .catch((error) => this.setState({ error }));
      });
    }, 5000);
  };

  handleFormChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="adoption-header">
          <h2>Pets currently up for adoption:</h2>
        </div>
        <div className="animals-section">
          <PetSelect
            pet={this.state.pets.cats[0]}
            type={'cat'}
            atFront={this.state.atFront}
            handleAdopt={this.handleAdopt}
          />
          <PetSelect
            pet={this.state.pets.dogs[0]}
            type={'dog'}
            atFront={this.state.atFront}
            handleAdopt={this.handleAdopt}
          />
        </div>
        <div className="message">
          {this.state.atFront !== false &&
            this.state.adoptionMessage === false && (
              <h2 style={{ color: 'green' }}>
                Your turn! Please choose a pet.
              </h2>
            )}
          {this.state.adoptionMessage !== false && (
            <h2 style={{ color: 'green' }}>
              Congratulations, your adoption was accepted!
            </h2>
          )}
          {this.state.waiting !== false && (
            <h2 style={{ color: 'orange' }}>Please wait...</h2>
          )}
        </div>

        {this.state.inLine === false && (
          <form className="adopt-form" onSubmit={this.handleSubmit}>
            <h4>Join the line to adopt!</h4>
            <label htmlFor="name">Your name:</label>
            <input
              id="name"
              type={'text'}
              onChange={(e) => this.handleFormChange(e)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        )}

        <Queue people={this.state.people} />
      </React.Fragment>
    );
  }
}