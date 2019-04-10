import gql from 'graphql-tag';


export const GET_USER_DATA = gql`
                  query GetUser($username: String!) {
                    user(username: $username ) {
                      id,
                      name
                    }
                  }
                  `;