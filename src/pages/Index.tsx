import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { ru } from 'date-fns/locale';

interface Patient {
  id: string;
  name: string;
  birthDate: string;
  phone: string;
  lastVisit: string;
  diagnosis: string;
  status: 'active' | 'completed' | 'scheduled';
}

interface Appointment {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const mockPatients: Patient[] = [
  { id: '001', name: 'Иванов Иван Иванович', birthDate: '15.03.1985', phone: '+7 (999) 123-45-67', lastVisit: '20.10.2024', diagnosis: 'Дерматит', status: 'active' },
  { id: '002', name: 'Петрова Мария Сергеевна', birthDate: '22.07.1990', phone: '+7 (999) 234-56-78', lastVisit: '18.10.2024', diagnosis: 'Псориаз', status: 'completed' },
  { id: '003', name: 'Сидоров Петр Алексеевич', birthDate: '10.12.1978', phone: '+7 (999) 345-67-89', lastVisit: '25.10.2024', diagnosis: 'Экзема', status: 'scheduled' },
  { id: '004', name: 'Козлова Елена Викторовна', birthDate: '05.05.1995', phone: '+7 (999) 456-78-90', lastVisit: '19.10.2024', diagnosis: 'Акне', status: 'active' },
];

const mockAppointments: Appointment[] = [
  { id: '1', time: '09:00', patient: 'Иванов И.И.', doctor: 'Смирнов А.П.', type: 'Первичный прием', status: 'scheduled' },
  { id: '2', time: '10:00', patient: 'Петрова М.С.', doctor: 'Кузнецова Л.И.', type: 'Повторный прием', status: 'in-progress' },
  { id: '3', time: '11:30', patient: 'Сидоров П.А.', doctor: 'Смирнов А.П.', type: 'Консультация', status: 'scheduled' },
  { id: '4', time: '14:00', patient: 'Козлова Е.В.', doctor: 'Новикова О.М.', type: 'Процедура', status: 'completed' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeModule, setActiveModule] = useState('dashboard');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
      active: { label: 'Активен', variant: 'default' },
      completed: { label: 'Завершен', variant: 'secondary' },
      scheduled: { label: 'Запланирован', variant: 'default' },
      'in-progress': { label: 'Идет прием', variant: 'default' },
    };
    const config = variants[status] || { label: status, variant: 'default' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-semibold">КВД CRM</h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">Кожно-венерологический диспансер</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant={activeModule === 'dashboard' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('dashboard')}
          >
            <Icon name="LayoutDashboard" className="mr-2 h-4 w-4" />
            Главная панель
          </Button>
          <Button 
            variant={activeModule === 'patients' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('patients')}
          >
            <Icon name="Users" className="mr-2 h-4 w-4" />
            Пациенты
          </Button>
          <Button 
            variant={activeModule === 'appointments' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('appointments')}
          >
            <Icon name="Calendar" className="mr-2 h-4 w-4" />
            Приёмы
          </Button>
          <Button 
            variant={activeModule === 'medcards' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('medcards')}
          >
            <Icon name="FileText" className="mr-2 h-4 w-4" />
            Медкарты
          </Button>
          <Button 
            variant={activeModule === 'tests' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('tests')}
          >
            <Icon name="FlaskConical" className="mr-2 h-4 w-4" />
            Анализы
          </Button>
          <Button 
            variant={activeModule === 'schedule' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveModule('schedule')}
          >
            <Icon name="Clock" className="mr-2 h-4 w-4" />
            Расписание
          </Button>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>АД</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-sm">
              <p className="font-medium">Администратор</p>
              <p className="text-sidebar-foreground/70">admin@kvd.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {activeModule === 'dashboard' && 'Главная панель'}
                {activeModule === 'patients' && 'Пациенты'}
                {activeModule === 'appointments' && 'Приёмы'}
                {activeModule === 'medcards' && 'Медицинские карты'}
                {activeModule === 'tests' && 'Анализы'}
                {activeModule === 'schedule' && 'Расписание врачей'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Button>
              <Icon name="Plus" className="mr-2 h-4 w-4" />
              Создать запись
            </Button>
          </div>
        </header>

        <div className="p-6">
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Всего пациентов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Icon name="Users" className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-3xl font-bold">1,284</p>
                        <p className="text-xs text-muted-foreground">+12% за месяц</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-3xl font-bold">28</p>
                        <p className="text-xs text-muted-foreground">4 в процессе</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Анализов ожидают</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Icon name="FlaskConical" className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-3xl font-bold">45</p>
                        <p className="text-xs text-muted-foreground">15 готовы</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Врачей на смене</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Icon name="Stethoscope" className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-3xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Из 18 врачей</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ближайшие приёмы</CardTitle>
                    <CardDescription>Расписание на сегодня</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAppointments.map(apt => (
                        <div key={apt.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center justify-center bg-primary/10 rounded px-3 py-2">
                              <span className="text-xs text-muted-foreground">Время</span>
                              <span className="font-semibold text-primary">{apt.time}</span>
                            </div>
                            <div>
                              <p className="font-medium">{apt.patient}</p>
                              <p className="text-sm text-muted-foreground">{apt.doctor} • {apt.type}</p>
                            </div>
                          </div>
                          {getStatusBadge(apt.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Календарь приёмов</CardTitle>
                    <CardDescription>Выберите дату для просмотра</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={ru}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeModule === 'patients' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Icon name="Search" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по ФИО или номеру карты..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Icon name="Filter" className="mr-2 h-4 w-4" />
                  Фильтры
                </Button>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ карты</TableHead>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Дата рождения</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Последний визит</TableHead>
                      <TableHead>Диагноз</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map(patient => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.birthDate}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.diagnosis}</TableCell>
                        <TableCell>{getStatusBadge(patient.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Icon name="Eye" className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Icon name="Edit" className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeModule === 'appointments' && (
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Сегодня</TabsTrigger>
                <TabsTrigger value="week">Неделя</TabsTrigger>
                <TabsTrigger value="month">Месяц</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Приёмы на сегодня</CardTitle>
                    <CardDescription>28 записей</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Время</TableHead>
                          <TableHead>Пациент</TableHead>
                          <TableHead>Врач</TableHead>
                          <TableHead>Тип приёма</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAppointments.map(apt => (
                          <TableRow key={apt.id}>
                            <TableCell className="font-medium">{apt.time}</TableCell>
                            <TableCell>{apt.patient}</TableCell>
                            <TableCell>{apt.doctor}</TableCell>
                            <TableCell>{apt.type}</TableCell>
                            <TableCell>{getStatusBadge(apt.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  <Icon name="FileText" className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Icon name="Edit" className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {(activeModule === 'medcards' || activeModule === 'tests' || activeModule === 'schedule') && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeModule === 'medcards' && 'Электронные медицинские карты'}
                  {activeModule === 'tests' && 'Лабораторные анализы'}
                  {activeModule === 'schedule' && 'Расписание врачей'}
                </CardTitle>
                <CardDescription>Модуль в разработке</CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <Icon name="Construction" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Этот раздел находится в разработке</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
