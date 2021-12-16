const { buildSchema } = require("graphql");

module.exports = buildSchema(`

        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
            metaId: String
            niche: Niche
            category: Category
        }

        type Niche {
            _id: ID!
            name: String!
        }

        type Category {
            _id: ID!
            name: String!
        }
        type Skill {
            _id: ID!
            name: String!
        }
        type Contract {
            _id: ID!
            name: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id:ID!
            email: String!
            password: String
            createdEvents: [Event!]
            metaId: String
            niche: Niche
            category: Category
            gender: String
            birthDate: String
            noOfFollowers: String
            skills: [Skill!]
            contract: Contract
            
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        input NicheInput {
            name: String!
        }

        input CategoryInput {
            name: String!
        }
        input SkillInput {
            name: String!
        }
        input ContractInput {
            name: String!
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            niches: [Niche!]!
            categories: [Category!]!
            skills: [Skill!]!
            contracts: [Contract!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
            createNiche(nicheInput: NicheInput): Niche
            createCategory(categoryInput: CategoryInput): Category
            createContract(contractInput: ContractInput): Contract
            createSkill(skillInput: SkillInput): Skill
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
      `);
