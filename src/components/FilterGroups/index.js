import './index.css'

const FilterGroup = props => {
  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachItem => {
      const {onChangeEmploymentType} = props
      const onChangeCheckBox = () =>
        onChangeEmploymentType(eachItem.employmentTypeId)

      return (
        <li key={eachItem.employmentTypeId} className="type-list-item">
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="input-type-checkbox"
            onChange={onChangeCheckBox}
          />
          <label
            htmlFor={eachItem.employmentTypeId}
            className="input-label-checkbox"
          >
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryOptions = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachItem => {
      const {onChangeSalaryRange, activeSalaryRange} = props
      const onChangeSalary = () => onChangeSalaryRange(eachItem.salaryRangeId)

      const isActive = eachItem.salaryRangeId === activeSalaryRange

      return (
        <li key={eachItem.salaryRangeId} className="type-list-item">
          <input
            name="salary"
            type="radio"
            id={eachItem.salaryRangeId}
            className="input-type-checkbox"
            onChange={onChangeSalary}
            checked={isActive}
          />
          <label
            htmlFor={eachItem.salaryRangeId}
            className="input-label-checkbox"
          >
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <hr className="filter-separator" />
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-lists">{renderTypeOfEmployment()}</ul>
      <hr className="filter-separator" />
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-lists">{renderSalaryOptions()}</ul>
    </div>
  )
}

export default FilterGroup
