
/*
This function checks if a .gitignore file exist in home directory.
If not, it checks if the home directory has a 'client' AND 'server' file
and assumes it has a .gitignore file in them. Returns 50 points
*/

export const gitIgnoreValidation = (fileCheck) => {
  
  const fileNames = fileCheck.map(file => {
    return file.name
  })
  
  let gitIgnoreScore = fileNames.includes('.gitignore') ? 100 : 0
  
  if(gitIgnoreScore === 0) {
    fileNames.includes('client' && 'server') ? gitIgnoreScore = 50 : null
  }
  return gitIgnoreScore
}