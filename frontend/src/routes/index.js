import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import Help from '~/pages/Help';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact isPrivate component={Students.list} />
      <Route path="/students/add" isPrivate component={Students.add} />
      <Route path="/students/edit" isPrivate component={Students.edit} />

      <Route path="/plans" exact isPrivate component={Plans.list} />
      <Route path="/plans/add" isPrivate component={Plans.add} />
      <Route path="/plans/edit" isPrivate component={Plans.edit} />

      <Route path="/enrollments" exact isPrivate component={Enrollments.list} />
      <Route path="/enrollments/add" isPrivate component={Enrollments.add} />
      <Route path="/enrollments/edit" isPrivate component={Enrollments.edit} />

      <Route path="/help" isPrivate component={Help} />
    </Switch>
  );
}
