import './index.css'

const LanguageFilterItem = props => {
  const {eachFilterDetails, updateActiveFilterId, isActive} = props
  const {language, id} = eachFilterDetails

  const languageFilterClassname = isActive
    ? 'active-filter-style'
    : 'inactive-filter-style'

  const onClickLanguageTab = () => {
    updateActiveFilterId(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={languageFilterClassname}
        onClick={onClickLanguageTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
