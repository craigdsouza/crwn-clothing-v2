import CategoryItem from '../category-item/category-item.component';

// import styles
import './directory-item.styles.scss';

const DirectoryItem = ({ categories }) => {
    return (
        <div className='directory-container'>
            {categories.map(({title, id, imageUrl}) => (
            <CategoryItem key={id} imageUrl={imageUrl} title={title} />
            ))}
        </div>
    )
}

export default DirectoryItem;