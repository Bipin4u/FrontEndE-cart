
import { useState } from "react";
import { Paginator } from 'primereact/paginator';

interface FilterProps {
    pageNumber: (value: number) => void;
    totalRecords : number 
}


const Paginater: React.FC<FilterProps> = ({pageNumber,totalRecords}) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    
    const onPageChange = (event:any) => {
        pageNumber(event.first / event.rows + 1)
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalRecords}  onPageChange={onPageChange} />
        </div>
    );
}

export default  Paginater   