import React from 'react';
import "./TableGeneral.scss";

const TableGeneral = ({ headers, body }) => {
    return (
        <div className="w-full h-full overflow-auto table-general">
            <table className='w-full'>
                <thead>
                    <tr>
                        {headers.map((header, index) => <th key={index} className='table-header-cell'>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        body.map((data, idx) => (
                            <tr key={idx} className='table-row group'>
                                {Object.keys(data).map((key, keyIdx) => (
                                    <td key={keyIdx} className='table-body-cell'>{data[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGeneral