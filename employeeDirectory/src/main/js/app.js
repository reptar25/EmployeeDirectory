import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeList from './employee-list';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersistentDrawerLeft from './sidebar'
import SearchBar from './search';

'use strict';

const client = require('./api/client');
const follow = require('./api/follow');

var root = "/api";
var username = '';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: [], attributes: [], links: {}, filterText: ''};

		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.filterTextChange = this.filterTextChange.bind(this);
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		this.loadUsername();
	}

	loadUsername(){
		fetch('/username')
		.then(response => response.json())
		.then(data => username = data.username);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'employees'}]
		).then(employeeCollection => {
			return client({
				method: 'GET',
				path: employeeCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				this.links = employeeCollection.entity._links;
				return employeeCollection;
			});
		}).done(employeeCollection => {
			this.setState({
				employees: employeeCollection.entity._embedded.employees,
				attributes: Object.keys(this.schema.properties),
				links: employeeCollection.entity._links});
			});
		}


		onNavigate(navUri) {
			client({method: 'GET', path: navUri}).done(employeeCollection => {
				this.setState({
					employees: employeeCollection.entity._embedded.employees,
					attributes: this.state.attributes,
					pageSize: this.state.pageSize,
					links: employeeCollection.entity._links
				});
			});
		}

		onCreate(newEmployee) {
			follow(client, root, ['employees']).then(employeeCollection => {
				return client({
					method: 'POST',
					path: employeeCollection.entity._links.self.href,
					entity: newEmployee,
					headers: {'Content-Type': 'application/json'}
				})
			}).then(response => {
				return follow(client, root, [
					{rel: 'employees', params: {'size': this.state.pageSize}}]);
				}).done(response => {
					if (typeof response.entity._links.last !== "undefined") {
						this.onNavigate(response.entity._links.last.href);
					} else {
						this.onNavigate(response.entity._links.self.href);
					}
				});
			}

			onDelete(employee) {
				client({method: 'DELETE', path: employee._links.self.href}
			).done(response => { this.loadFromServer(this.state.pageSize); },
			response => {
				if (response.status.code === 403) {
					alert('ACCESS DENIED: You are not authorized to delete ' +
					employee._links.self.href);
				}
			});
		}

		onEdit(oldEmployee, newEmployee){
			client({method: 'PATCH', path: oldEmployee._links.self.href, entity: newEmployee, headers: {'Content-Type': 'application/json'}})
			.done(response => {
				this.loadFromServer(this.state.pageSize);
			}, response => {
				if (response.status.code === 403) {
					alert('ACCESS DENIED: You are not authorized to update ' +
					oldEmployee._links.self.href);
				}
				if (response.status.code === 412) {
					alert('DENIED: Unable to update ' +
					oldEmployee._links.self.href + '. Your copy is stale.');
				}
			}
		);
	}

	filterTextChange(filterText){
		this.setState({
			filterText: filterText
		})
	}

	render() {
		return (
			<div>

				<PersistentDrawerLeft
					attributes={this.state.attributes}
					onCreate={this.onCreate}
					/>

				<Grid
					container
					spacing={2}
					>

					<Grid item xs={12}>

						<Typography variant="h6" gutterBottom>
							Currently logged in as: {username}

						</Typography>

					</Grid>

					<Grid item xs={12}>

              <SearchBar
                  filterText={this.state.filterText}
                  filterTextChange={this.filterTextChange}
                />
          </Grid>

					<Grid item xs={12}>

						<EmployeeList
							employees={this.state.employees}
							links={this.state.links}
							pageSize={this.state.pageSize}
							onNavigate={this.onNavigate}
							onDelete={this.onDelete}
							updatePageSize={this.updatePageSize}
							onEdit={this.onEdit}
							attributes={this.state.attributes}
							filterText={this.state.filterText}
							/>

					</Grid>

				</Grid>

			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
