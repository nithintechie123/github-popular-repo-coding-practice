import './index.css'

const starIcon = 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png '
const forkIcon = 'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const issuesIcon =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = eachRepoDetails
  return (
    <li className="each-repo-item">
      <img src={avatarUrl} alt={name} className="repo-item-avatar " />
      <h1 className="repo-item-name ">{name}</h1>
      <div className="image-count-container">
        <img src={starIcon} alt="stars" className="repo-image" />
        <p className="count-name">{starsCount} stars</p>
      </div>
      <div className="image-count-container">
        <img src={forkIcon} alt="forks" className="repo-image" />
        <p className="count-name">{forksCount} forks</p>
      </div>
      <div className="image-count-container">
        <img src={issuesIcon} alt="open issues" className="repo-image" />
        <p className="count-name">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
