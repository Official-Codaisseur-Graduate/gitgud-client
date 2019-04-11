import gql from 'graphql-tag';


export const GET_USER_DATA = gql`
                  query GetUser($username: String!) {
                    user(username: $username ) {
                      username,
                      score,
                      profileStats {
                        bio,
                        email,
                        isHireable,
                        location,
                        name,
                        websiteUrl,
                        pinnedRepositories,
                        picture
                      },
                      stats {
                        totalPinnedRepros,
                        averageBranchPerRepro,
                        averageCommitPerBranch
                      }
                    }
                  }
                  `;