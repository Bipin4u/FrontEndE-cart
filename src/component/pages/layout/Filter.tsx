import { TabMenu } from "primereact/tabmenu";
import "primereact/resources/themes/saga-blue/theme.css"; // Import your desired theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Chip } from "primereact/chip";

interface FilterProps {
  setsort: (value: string) => void; 
}

const Filter: React.FC<FilterProps> = ({ setsort }) => {
  return (
    <div>
      <div
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          flexWrap: "nowrap",
          scrollbarWidth: "none", 
        }}
        className="flex gap-2 m-2 mt-4"
      >
        <span className="text-decoration-underline">sort by</span>{" "}

        <Chip
          onClick={() => setsort("-rating")}
          className="mx-2 "
          style={{ cursor: "pointer" }}
          label="Popularity"
          icon="pi pi-star"
        />
        <Chip
          onClick={() => setsort("-price")}
          className="mx-2 cursor-pointer"
          label="Sort -- High to Low"
          style={{ cursor: "pointer" }}
          icon="pi pi-sort-amount-down"
        />
        <Chip
          onClick={() => setsort("price")}
          className="mx-2 cursor-pointerr"
          label="Sort -- Low to High"
          style={{ cursor: "pointer" }}
          icon="pi pi-sort-amount-up"
        />
        <Chip
          onClick={() => setsort("-reviews_count")}
          className="mx-2 cursor-pointer"
          style={{ cursor: "pointer" }}
          label="Best Seller"
          icon="pi pi-calendar"
        />
      </div>
    </div>
  );
};

export default Filter;
