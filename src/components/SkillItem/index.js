import './index.css'

const SkillItem = props => {
  const {skillCard} = props
  const {imageUrl, name} = skillCard
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
