import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import your desired theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface FilterProps {
    setsort: (value: string) => void; // Define the type for setsort function
}

const Filter: React.FC<FilterProps> = ({ setsort }) => {
    const items: { label: string; icon: string; command?: () => void }[] = [
        { 
            label: 'Popularity', 
            icon: 'pi pi-star',
            command: () => setsort('-rating') // Call setsort with the relevant sort value
        },
        { 
            label: 'Sort -- High to Low', 
            icon: 'pi pi-sort-amount-down',
            command: () => setsort('-price') // Call setsort with the relevant sort value
        },
        { 
            label: 'Sort -- Low to High', 
            icon: 'pi pi-sort-amount-up',
            command: () => setsort('price') // Call setsort with the relevant sort value
        },
        { 
            label: 'Latest', 
            icon: 'pi pi-calendar',
            command: () => setsort('latest') // Call setsort with the relevant sort value
        }
    ];

    return (
        <div className='d-flex align-items-center'>
            
            <h3>Sort By</h3>
            <div style={{ color: '#008374' }} className="m-2 card flex-grow-1">
                <TabMenu model={items} />
            </div>
        </div>
    );
}

export default Filter;
