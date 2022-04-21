import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import { color } from "highcharts";
// const AppSubmenu = (props) => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const onMenuItemClick = (event, item, index) => {
//     //avoid processing disabled items
//     if (item.disabled) {
//       event.preventDefault();
//       return true;
//     }

//     //execute command
//     if (item.command) {
//       item.command({ originalEvent: event, item: item });
//     }

//     if (index === activeIndex) setActiveIndex(null);
//     else setActiveIndex(index);

//     if (props.onMenuItemClick) {
//       props.onMenuItemClick({
//         originalEvent: event,
//         item: item,
//       });
//     }
//   };

//   const renderLinkContent = (item) => {
//     let submenuIcon = item.items && (
//       <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
//     );
//     let badge = item.badge && (
//       <span className="menuitem-badge">{item.badge}</span>
//     );

//     return (
//       <React.Fragment>
//         <i className={item.icon}></i>
//         <span>{item.label}</span>
//         {submenuIcon}
//         {badge}
//       </React.Fragment>
//     );
//   };

//   const renderLink = (item, i) => {
//     let content = renderLinkContent(item);

//     if (item.to) {
//       return (
//         <NavLink
//           activeClassName="active-route"
//           to={item.to}
//           onClick={(e) => onMenuItemClick(e, item, i)}
//           exact
//           target={item.target}
//         >
//           {content}
//         </NavLink>
//       );
//     } else {
//       return (
//         <a
//           href={item.url}
//           onClick={(e) => onMenuItemClick(e, item, i)}
//           target={item.target}
//         >
//           {content}
//         </a>
//       );
//     }
//   };

//   let items =
//     props.items &&
//     props.items.map((item, i) => {
//       let active = activeIndex === i;
//       let styleClass = classNames(item.badgeStyleClass, {
//         "active-menuitem": active && !item.to,
//       });

//       return (
//         <li className={styleClass} key={i}>
//           {item.items && props.root === true && <div className="arrow"></div>}
//           {renderLink(item, i)}
//           <CSSTransition
//             classNames="p-toggleable-content"
//             timeout={{ enter: 1000, exit: 450 }}
//             in={active}
//             unmountOnExit
//           >
//             <AppSubmenu
//               items={item.items}
//               onMenuItemClick={props.onMenuItemClick}
//             />
//           </CSSTransition>
//         </li>
//       );
//     });

//   return items ? <ul className={props.className}>{items}</ul> : null;
// };

export const AppMenu = (props) => {
  const [cities, setCities] = useState([]);
  
  const [selectedCities1, setSelectedCities1] = useState(null);
  const [selectedState1, setSelectedState1] = useState(null);
  const [selectedTown1, setSelectedTown1] = useState(null);
  const city = [
    { name: '700215',  },
    { name: '700154', },
    { name: '700354',  },
    { name: '700547',  },
    { name: '700963',  }
];
const state = [
  { name: '700215',  },
  { name: '700154', },
  { name: '700354',  },
  { name: '700547',  },
  { name: '700963',  }
];
const town = [
  { name: '700215',  },
  { name: '700154', },
  { name: '700354',  },
  { name: '700547',  },
  { name: '700963',  }
];
 


  const onCityChange = (e) => {
    let selectedCities = [...cities];
    if(e.checked)
        selectedCities.push(e.value);
    else
        selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setCities(selectedCities);
}
  return (
    <div className="layout-menu-container">
      <div style={{marginLeft:'50px', fontSize:'25px' ,fontFamily:'Poppins', color:'lightgray'}} >
      <span>Filter By</span>
      </div>
      <hr/>
     
      <div style={{marginLeft:'25px' ,fontFamily:'Poppins'}}>
        <strong>Material status</strong>
        </div>
     <div className="gridcheck">
    <Checkbox inputId="cb1" value="Urgent" onChange={onCityChange} checked={cities.includes('Urgent')} style={{marginRight:'15px'}}></Checkbox>
    <label htmlFor="cb1" className="p-checkbox-label">Urgent</label>
   
</div>
<div className="gridcheck">
    <Checkbox inputId="cb2" value="Depleting fast" onChange={onCityChange} checked={cities.includes('Depleting fast')}  style={{marginRight:'15px'}}></Checkbox>
    <label htmlFor="cb2" className="p-checkbox-label">Depleting fast</label>


</div>
<div className="gridcheck">
    <Checkbox inputId="cb3" value="Sufficient" onChange={onCityChange} checked={cities.includes('Sufficient')}  style={{marginRight:'15px'}}></Checkbox>
    <label htmlFor="cb3" className="p-checkbox-label">Sufficient</label>
    
</div>
<hr/>
<div style={{marginLeft:'25px',fontFamily:'Poppins'}}>
        <strong>Material ID</strong>
        </div>
<div className="gridcol">
<MultiSelect value={selectedCities1} options={city} onChange={(e) => setSelectedCities1(e.value)} optionLabel="name" placeholder="Select ID" maxSelectedLabels={5}  />
  </div>
  <hr/>
  <div style={{marginLeft:'25px',fontFamily:'Poppins'}}>
        <strong>Plant ID</strong>
        </div>
  <div className="gridcol">
<MultiSelect value={selectedState1} options={state} onChange={(e) => setSelectedState1(e.value)} optionLabel="name" placeholder="Select ID" maxSelectedLabels={5} />
  </div>
  <hr/>
  <div style={{marginLeft:'25px',fontFamily:'Sans-serif'}}>
        <strong>Tags</strong>
        </div>
  <div className="gridcol">
<MultiSelect value={selectedTown1} options={town} onChange={(e) => setSelectedTown1(e.value)} optionLabel="name" placeholder="SELECT ID" maxSelectedLabels={5} />
  </div>
 
    </div>
  );
};
