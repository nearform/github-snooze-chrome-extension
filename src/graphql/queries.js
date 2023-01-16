export const DISCUSSION_QUERY = `
  query Discussion($owner: String! , $name: String!, $number: Int! ) {
    repository(owner: $owner, name: $name) {
      discussion(number: $number) {
        updatedAt
      }
    }
  }
`