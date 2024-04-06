import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposData()
  }

  getReposData = async () => {
    const {activeFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        reposData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveFilterId = id => {
    this.setState({activeFilterId: id}, this.getReposData)
    console.log(id)
  }

  renderLoaderComponent = () => (
    <div className="repo-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderRepositoryItems = () => {
    const {reposData} = this.state
    console.log(reposData)

    return (
      <ul className="repo-items-container">
        {reposData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLanguageFilterItems = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="language-filters-container">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            key={eachFilter.id}
            eachFilterDetails={eachFilter}
            isActive={eachFilter.id === activeFilterId}
            updateActiveFilterId={this.updateActiveFilterId}
          />
        ))}
      </ul>
    )
  }

  renderFailureComponent = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-description">Something Went Wrong</h1>
    </div>
  )

  renderRepoContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItems()
      case apiStatusConstants.failure:
        return this.renderFailureComponent()
      case apiStatusConstants.inProgress:
        return this.renderLoaderComponent()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="git-hub-popular-repo-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFilterItems()}
        {this.renderRepoContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
