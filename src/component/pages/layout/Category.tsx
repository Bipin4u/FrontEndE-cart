import "../css/category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const items = [
  {
    cardimg: "sofa.png",
    title: "Sofa",
    type:'sofa'
  },
  {
    cardimg: "recliner.png",
    title: "Recliner",
    type:'recliner'
  },
  {
    cardimg: "dining.png",
    title: "Dyning",
    type:'dining'
  },
  {
    cardimg: "bed.png",
    title: "Bed",
    type:'bed'
  },
  {
    cardimg: "desk.png",
    title: "Office & Study Table",
    type: 'office_study_table'
  },
  {
    cardimg: "woodchair.png",
    title: "Chair",
    type:'chair'
  },
  {
    cardimg: "table.png",
    title: "Center Table",
    type:'center_table'
  },
  {
    cardimg: "office_chair.png",
    title: "Office Chair",
    type: "office_chair"
  },
];

function Category() {
  return (
    <section className="hero_section container">
      <div className="hero_card_container">
        {items.map((item, index) => ( 
          <Link  to={`/category-list/${item.type}`} className="hero_icon_box" key={index}>
            <div className="hero_image_section">
              <img className="hero_image" src={item.cardimg} alt={item.title} />
            </div>
            <h4 className="hero_title">{item.title}</h4>
          </Link>    
        ))}
      </div>
    </section>
  );
}

export default Category;
