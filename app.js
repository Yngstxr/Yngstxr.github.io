const PHYS_CONSTS = {
    g: 9.80665,
    G: 6.67430e-11,
    mu0: 4 * Math.PI * 1e-7,
    eps0: 8.85418781e-12,
    h: 6.62607015e-34,
    hp: 6.62607015e-34,
    hpl: 6.62607015e-34,
    hb: 1.054571817e-34,
    hbar: 1.054571817e-34,
    h_bar: 1.054571817e-34,
    c: 299792458,
    c_light: 299792458,
    e: 1.602176634e-19,
    e_charge: 1.602176634e-19,
    Rr: 10973731.568160,
    R_ryd: 10973731.568160,
    NA: 6.02214076e23
};

const CONST_META = {
    g: { label: 'Ускорение св. падения g', unit: 'м/с²' },
    G: { label: 'Гравитационная постоянная G', unit: 'Н·м²/кг²' },
    mu0: { label: 'Магнитная постоянная μ₀', unit: 'Гн/м' },
    eps0: { label: 'Электрическая постоянная ε₀', unit: 'Ф/м' },
    h: { label: 'Постоянная Планка h', unit: 'Дж·с' },
    hp: { label: 'Постоянная Планка h', unit: 'Дж·с' },
    hb: { label: 'Постоянная Дирака ℏ', unit: 'Дж·с' },
    hbar: { label: 'Постоянная Дирака ℏ', unit: 'Дж·с' },
    c: { label: 'Скорость света в вакууме c', unit: 'м/с' },
    e: { label: 'Элементарный заряд e', unit: 'Кл' },
    Rr: { label: 'Постоянная Ридберга R', unit: 'м⁻¹' },
    NA: { label: 'Постоянная Авогадро N_A', unit: 'моль⁻¹' }
};

const ALLOWED_FUNCTIONS = new Set(['log', 'ln', 'lg', 'root', 'sqrt', 'sin', 'cos', 'tan', 'tg', 'ctg', 'abs', 'min', 'max']);
const TWO_ARG_FUNCTIONS = new Set(['log', 'root', 'min', 'max']);

const physicsFormulas = [
    { id:"m0", title:"Скорость при равномерном движении", category:"Механика", description:"Скорость тела при неизменном расстоянии S.", formula:"v = S / t", unit:"м/с", inputs:[{id:"S", label:"Расстояние S (м)", val:50}, {id:"t", label:"Время t (с)", val:10}] },
    { id:"m1", title:"Скорость при равноускоренном движении", category:"Механика", description:"Мгновенная скорость в момент времени t.", formula:"v = v_0 + a · t", unit:"м/с", inputs:[{id:"v0", label:"Нач. скорость v₀ (м/с)", val:2}, {id:"a", label:"Ускорение a (м/с²)", val:1.5}, {id:"t", label:"Время t (с)", val:6}] },
    { id:"m2", title:"Путь при равномерном движении", category:"Механика", description:"Путь, пройденный телом при неизменной скорости движения v.", formula:"S = v · t", unit:"м", inputs:[{id:"v", label:"Скорость v (м/с)", val:10}, {id:"t", label:"Время t (с)", val:10}] },
    { id:"m3", title:"Путь при равноускоренном движении", category:"Механика", description:"Перемещение тела с постоянным ускорением a.", formula:"S = v_0 · t + a · t² / 2", unit:"м", inputs:[{id:"v0", label:"Нач. скорость v₀ (м/с)", val:3}, {id:"t", label:"Время t (с)", val:15}, {id:"a", label:"Ускорение a (м/с²)", val:3}] },
    { id:"m4", title:"Путь при равноускоренном движении (без времени)", category:"Механика", description:"Перемещение через разность квадратов скоростей.", formula:"S = (v² - v_0²) / (2 · a)", unit:"м", inputs:[{id:"v0", label:"Нач. скорость v₀ (м/с)", val:3}, {id:"v", label:"Кон. скорость v (м/с)", val:15}, {id:"a", label:"Ускорение a (м/с²)", val:3}] },
    { id:"m5", title:"Максимальная высота подъема тела", category:"Механика", description:"Высота взлета тела, брошенного вертикально вверх.", formula:"h_max = v_0² / (2 · g)", unit:"м", inputs:[{id:"v0", label:"Начальная скорость v₀ (м/с)", val:15}, {id:"g", label:"Ускорение св. падения g (м/с²)", val:9.80665}] },
    { id:"m6", title:"Дальность броска", category:"Механика", description:"Расстояние L, пройденное телом, брошенным под углом к горизонту.", formula:"L = v_0 · t · cos(α)", unit:"м", inputs:[{id:"v0", label:"Нач. скорость v₀ (м/с)", val:10}, {id:"t", label:"Время t (с)", val:10}, {id:"alpha", label:"Угол броска α (градусы)", val:60}] },
    { id:"m7", title:"Координата при равноускоренном движении", category:"Механика", description:"Позиция тела с учетом постоянного ускорения.", formula:"x = x_0 + v_0 · t + (a · t²) / 2", unit:"м", inputs:[{id:"x0", label:"Нач. координата x₀ (м)", val:0}, {id:"v0", label:"Нач. скорость v₀ (м/с)", val:4}, {id:"a", label:"Ускорение a (м/с²)", val:2}, {id:"t", label:"Время t (с)", val:5}] },
    { id:"m8", title:"Координата при равномерном движении", category:"Механика", description:"Позиция тела при неизменной скорости движения.", formula:"x = x_0 + v · t", unit:"м", inputs:[{id:"x0", label:"Начальная координата x₀ (м)", val:0}, {id:"v", label:"Скорость v (м/с)", val:5}, {id:"t", label:"Время t (с)", val:10}] },
    { id:"m9", title:"Ускорение движения тела", category:"Механика", description:"Изменение линейной скорости за промежуток времени.", formula:"a = (v - v_0) / t", unit:"м/с²", inputs:[{id:"v0", label:"Нач. скорость v₀ (м/с)", val:0}, {id:"v", label:"Кон. скорость v (м/с)", val:20}, {id:"t", label:"Время t (с)", val:4}] },
    { id:"m10", title:"Ускорение свободного падения от высоты", category:"Механика", description:"Ослабление гравитации планеты с ростом высоты h.", formula:"g_h = G · M / (R + h)²", unit:"м/с²", inputs:[{id:"G", label:"Гравит. постоянная G", val:6.674e-11}, {id:"M", label:"Масса планеты M (кг)", val:5.97e24}, {id:"R", label:"Радиус планеты R (м)", val:6371000}, {id:"h", label:"Высота h (м)", val:400000}] },
    { id:"m11", title:"Период", category:"Механика", description:"Время, за которое происходит одно полное повторение.", formula:"T = 1 / ν", unit:"с", inputs:[{id:"nu", label:"Частота ν (Гц)", val:5}] },
    { id:"m12", title:"Частота", category:"Механика", description:"Количество полных повторений, которые происходят за одну секунду.", formula:"ν = 1 / T", unit:"Гц", inputs:[{id:"T", label:"Период T (с)", val:0.2}] },
    { id:"m13", title:"Период через число оборотов", category:"Механика", description:"Время, за которое происходит одно полное повторение.", formula:"T = t / N", unit:"с", inputs:[{id:"N", label:"Количество оборотов N", val:5}, {id:"t", label:"Время t (с)", val:5}] },
    { id:"m14", title:"Частота через число оборотов", category:"Механика", description:"Количество полных повторений в единицу времени.", formula:"ν = N / t", unit:"Гц", inputs:[{id:"N", label:"Количество оборотов N", val:5}, {id:"t", label:"Время t (с)", val:5}] },
    { id:"m15", title:"Линейная скорость по окружности", category:"Механика", description:"Скорость движения по круговой траектории.", formula:"v = (2 · π · R) / T", unit:"м/с", inputs:[{id:"R", label:"Радиус R (м)", val:2}, {id:"T", label:"Период T (с)", val:4}] },
    { id:"m16", title:"Угловая скорость", category:"Механика", description:"Скорость изменения угла поворота радиус-вектора.", formula:"ω = v / R", unit:"рад/с", inputs:[{id:"v", label:"Линейная скорость v (м/с)", val:12}, {id:"R", label:"Радиус R (м)", val:3}] },
    { id:"m17", title:"Связь циклической частоты и периода", category:"Механика", description:"Скорость изменения угла поворота при движении по окружности.", formula:"ω = (2 · π) / T", unit:"рад/с", inputs:[{id:"T", label:"Период T (с)", val:2}] },
    { id:"m18", title:"Центростремительное ускорение", category:"Механика", description:"Ускорение при вращении по круговой орбите.", formula:"a_ц = v² / R", unit:"м/с²", inputs:[{id:"v", label:"Скорость v (м/с)", val:10}, {id:"R", label:"Радиус R (м)", val:5}] },
    { id:"m19", title:"Первая космическая скорость", category:"Механика", description:"Скорость, чтобы тело стало спутником планеты.", formula:"v_1 = √(G · M / R)", unit:"м/с", inputs:[{id:"G", label:"Гравит. постоянная G", val:6.674e-11}, {id:"M", label:"Масса планеты M (кг)", val:5.97e24}, {id:"R", label:"Радиус планеты R (м)", val:6371000}] },
    { id:"m20", title:"Вторая космическая скорость", category:"Механика", description:"Минимальная скорость для преодоления притяжения планеты.", formula:"v_2 = √(2 · G · M / R)", unit:"м/с", inputs:[{id:"G", label:"Гравит. постоянная G", val:6.674e-11}, {id:"M", label:"Масса планеты M (кг)", val:5.97e24}, {id:"R", label:"Радиус планеты R (м)", val:6371000}] },
    { id:"m21", title:"Третья космическая скорость", category:"Механика", description:"Скорость для покидания Солнечной системы у поверхности Земли.", formula:"v_3 = √(v_z² + v_2² · (√2 - 1)²)", unit:"м/с", inputs:[{id:"vz", label:"Орбитальная скорость v_z (м/с)", val:29780}, {id:"v2", label:"Вторая космическая v_2 (м/с)", val:11200}] },
    { id:"m22", title:"Четвертая космическая скорость", category:"Механика", description:"Минимальная скорость, чтобы покинуть галактику.", formula:"v_4 = √2 · v_гал", unit:"м/с", inputs:[{id:"vгал", label:"Орбитальная скорость галактики (м/с)", val:220000}] },
    { id:"m23", title:"Закон всемирного тяготения Ньютона", category:"Механика", description:"Взаимное гравитационное притяжение двух масс.", formula:"F = G · m_1 · m_2 / r²", unit:"Н", inputs:[{id:"G", label:"Гравит. постоянная G", val:6.674e-11}, {id:"m1", label:"Масса m_1 (кг)", val:5.97e24}, {id:"m2", label:"Масса m_2 (кг)", val:7.34e22}, {id:"r", label:"Дистанция r (м)", val:3.84e8}] },
    { id:"m24", title:"Сила тяжести", category:"Механика", description:"Притяжение тела к планете.", formula:"F = m · g", unit:"Н", inputs:[{id:"m", label:"Масса тела m (кг)", val:5}, {id:"g", label:"Ускорение свободного падения g", val:9.81}] },
    { id:"m25", title:"Вес тела при движении с ускорением вверх", category:"Механика", description:"Вес тела с учетом перегрузки.", formula:"P = m · (g + a)", unit:"Н", inputs:[{id:"m", label:"Масса тела m (кг)", val:5}, {id:"g", label:"Ускорение св. падения g (м/с²)", val:9.81}, {id:"a", label:"Ускорение движения a (м/с²)", val:2}] },
    { id:"m26", title:"Вес тела при движении с ускорением вниз", category:"Механика", description:"Снижение веса при падении.", formula:"P = m · (g - a)", unit:"Н", inputs:[{id:"m", label:"Масса тела m (кг)", val:5}, {id:"g", label:"Ускорение св. падения g (м/с²)", val:9.81}, {id:"a", label:"Ускорение движения a (м/с²)", val:2}] },
    { id:"m27", title:"Момент инерции материальной точки", category:"Механика", description:"Мера инертности во вращательном движении.", formula:"J = m · R²", unit:"кг·м²", inputs:[{id:"m", label:"Масса m (кг)", val:2}, {id:"R", label:"Радиус R (м)", val:1.5}] },
    { id:"m28", title:"Кинетическая энергия", category:"Механика", description:"Энергия движения материального тела.", formula:"E_к = (m · v²) / 2", unit:"Дж", inputs:[{id:"m", label:"Масса m (кг)", val:80}, {id:"v", label:"Скорость v (м/с)", val:12}] },
    { id:"m29", title:"Потенциальная энергия в поле тяжести", category:"Механика", description:"Энергия положения тела над нулевым уровнем.", formula:"E_p = m · g · h", unit:"Дж", inputs:[{id:"m", label:"Масса m (кг)", val:5}, {id:"g", label:"Ускорение св. падения g", val:9.81}, {id:"h", label:"Высота h (м)", val:10}] },
    { id:"m30", title:"Потенциальная энергия пружины", category:"Механика", description:"Энергия упругой деформации тела.", formula:"E_p = (k · x²) / 2", unit:"Дж", inputs:[{id:"k", label:"Жесткость k (Н/м)", val:500}, {id:"x", label:"Растяжение x (м)", val:0.04}] },
    { id:"m33", title:"Импульс тела", category:"Механика", description:"Количество движения материальной точки.", formula:"p = m · v", unit:"кг·м/с", inputs:[{id:"m", label:"Масса m (кг)", val:5}, {id:"v", label:"Скорость v (м/с)", val:8}] },
    { id:"m34", title:"Импульс силы", category:"Механика", description:"Мера изменения импульса тела под воздействием силы.", formula:"J = F · t", unit:"Н·с", inputs:[{id:"F", label:"Сила F (Н)", val:15}, {id:"t", label:"Время t (с)", val:3}] },
    { id:"m35", title:"Момент импульса материальной точки", category:"Механика", description:"Мера вращательного движения тела.", formula:"L = m · v · r", unit:"кг·м²/с", inputs:[{id:"m", label:"Масса m (кг)", val:2}, {id:"v", label:"Скорость v (м/с)", val:5}, {id:"r", label:"Радиус-вектор r (м)", val:1.5}] },
    { id:"m36", title:"Закон сохранения импульса (соударение)", category:"Механика", description:"Скорость после неупругого удара.", formula:"u = (m_1 · v_1 + m_2 · v_2) / (m_1 + m_2)", unit:"м/с", inputs:[{id:"m1", label:"m_1 (кг)", val:2}, {id:"v1", label:"v_1 (м/с)", val:6}, {id:"m2", label:"m_2 (кг)", val:3}, {id:"v2", label:"v_2 (м/с)", val:1}] },
    { id:"m37", title:"Механическая работа силы", category:"Механика", description:"Работа постоянной силы при перемещении.", formula:"A = F · S · cos(α)", unit:"Дж", inputs:[{id:"F", label:"Сила F (Н)", val:40}, {id:"S", label:"Путь S (м)", val:5}, {id:"alpha", label:"Угол α (градусы)", val:0}] },
    { id:"m38", title:"Механическая мощность", category:"Механика", description:"Скорость совершения работы силой.", formula:"N = F · v", unit:"Вт", inputs:[{id:"F", label:"Сила F (Н)", val:300}, {id:"v", label:"Скорость v (м/с)", val:15}] },
    { id:"m39", title:"Работа силы трения", category:"Механика", description:"Работа, совершаемая силой трения.", formula:"A = -F_тр · Δr", unit:"Дж", inputs:[{id:"Fтр", label:"Сила трения F_тр (Н)", val:10}, {id:"dr", label:"Перемещение Δr (м)", val:5}] },
    { id:"m40", title:"Механическая мощность через скорость", category:"Механика", description:"Мгновенная мощность силы через скорость и угол.", formula:"N = F · v · cos(α)", unit:"Вт", inputs:[{id:"F", label:"Сила F (Н)", val:50}, {id:"v", label:"Скорость v (м/с)", val:4}, {id:"alpha", label:"Угол α (градусы)", val:0}] },
    { id:"m41", title:"Период пружинного маятника", category:"Механика", description:"Время полного колебания груза на упругой пружине.", formula:"T = 2 · π · √(m / k)", unit:"с", inputs:[{id:"m", label:"Масса груза m (кг)", val:0.4}, {id:"k", label:"Жесткость k (Н/м)", val:160}] },
    { id:"m42", title:"Период математического маятника", category:"Механика", description:"Период колебаний нитяного маятника в поле тяжести.", formula:"T = 2 · π · √(l / g)", unit:"с", inputs:[{id:"l", label:"Длина нити l (м)", val:1}, {id:"g", label:"Ускорение св. падения g (м/с²)", val:9.81}] },
    { id:"m43", title:"Циклическая частота пружинного маятника", category:"Механика", description:"Собственная круговая частота пружинной системы.", formula:"ω = √(k / m)", unit:"рад/с", inputs:[{id:"k", label:"Жесткость k (Н/м)", val:100}, {id:"m", label:"Масса груза m (кг)", val:0.25}] },
    { id:"m44", title:"Полная энергия пружинного маятника", category:"Механика", description:"Запасаемая механическая энергия колебательной структуры.", formula:"E = k · A² / 2", unit:"Дж", inputs:[{id:"k", label:"Жесткость k (Н/м)", val:200}, {id:"A", label:"Амплитуда A (м)", val:0.05}] },
    { id:"m45", title:"Уравнение колебаний (смещение)", category:"Механика", description:"Мгновенная координата при синусоидальном гармоническом движении.", formula:"x = A · cos(ω · t)", unit:"м", inputs:[{id:"A", label:"Амплитуда A (м)", val:0.05}, {id:"w", label:"Частота ω (рад/с)", val:4}, {id:"t", label:"Время t (с)", val:2}] },
    { id:"m46", title:"Амплитуда скорости при колебаниях", category:"Механика", description:"Максимальная скорость в гармоническом процессе.", formula:"v_max = A · ω", unit:"м/с", inputs:[{id:"A", label:"Амплитуда A (м)", val:0.02}, {id:"w", label:"Частота ω (рад/с)", val:10}] },
    { id:"m47", title:"Амплитуда ускорения при колебаниях", category:"Механика", description:"Пиковое ускорение колебательного движения.", formula:"a_max = A · ω²", unit:"м/с²", inputs:[{id:"A", label:"Амплитуда A (м)", val:0.02}, {id:"w", label:"Частота ω (рад/с)", val:10}] },
    { id:"m48", title:"Длина волны через период", category:"Механика", description:"Пространственный период волны.", formula:"λ = v · T", unit:"м", inputs:[{id:"v", label:"Скорость v (м/с)", val:340}, {id:"T", label:"Период T (с)", val:0.002}] },
    { id:"m49", title:"Связь скорости и длины волны", category:"Механика", description:"Скорость распространения волнового фронта.", formula:"v = λ · ν", unit:"м/с", inputs:[{id:"lambda", label:"Длина волны λ (м)", val:0.5}, {id:"nu", label:"Частота ν (Гц)", val:680}] },
    { id:"m50", title:"Разность фаз колебаний", category:"Механика", description:"Сдвиг фаз между точками, удаленными на расстояние Δx.", formula:"Δφ = (2 · π · Δx) / λ", unit:"рад", inputs:[{id:"dx", label:"Расстояние Δx (м)", val:0.1}, {id:"lambda", label:"Длина волны λ (м)", val:0.4}] },
    { id:"m41_2", title:"Гидростатическое давление", category:"Механика", description:"Давление, оказываемое неподвижной жидкостью.", formula:"p = ρ · g · h", unit:"Па", inputs:[{id:"rho", label:"Плотность жидкости ρ (кг/м³)", val:1000}, {id:"g", label:"Ускорение св. падения g", val:9.81}, {id:"h", label:"Глубина h (м)", val:1}] },
    { id:"m51", title:"Полное гидростатическое давление", category:"Механика", description:"Давление столба жидкости на глубине h с учетом атмосферного.", formula:"P = P_0 + ρ · g · h", unit:"Па", inputs:[{id:"P0", label:"Атмосферное P₀ (Па)", val:101325}, {id:"g", label:"Ускорение св. падения g", val:9.81}, {id:"rho", label:"Плотность ρ (кг/м³)", val:1000}, {id:"h", label:"Глубина h (м)", val:10}] },
    { id:"m52", title:"Сила давления через паскали", category:"Механика", description:"Сила, действующая перпендикулярно поверхности.", formula:"F = P · S", unit:"Н", inputs:[{id:"P", label:"Давление P (Па)", val:100000}, {id:"S", label:"Площадь S (м²)", val:0.5}] },
    { id:"m53", title:"Закон Архимеда", category:"Механика", description:"Выталкивающая сила, действующая на тело в среде.", formula:"F_A = ρ · g · V", unit:"Н", inputs:[{id:"rho", label:"Плотность среды ρ (кг/м³)", val:1000}, {id:"g", label:"Ускорение св. падения g", val:9.81}, {id:"V", label:"Объем тела V (м³)", val:0.05}] },
    { id:"m54", title:"Сила трения скольжения", category:"Механика", description:"Сила сопротивления при относительном перемещении.", formula:"F_тр = μ · N", unit:"Н", inputs:[{id:"mu", label:"Коэффициент трения μ", val:0.25}, {id:"N", label:"Прижимная сила N (Н)", val:200}] },
    { id:"m55", title:"Сила упругости (Закон Гука)", category:"Механика", description:"Возникает при деформации конструкции.", formula:"F_упр = k · x", unit:"Н", inputs:[{id:"k", label:"Жесткость k (Н/м)", val:2000}, {id:"x", label:"Смещение x (м)", val:0.02}] },
    { id:"m56", title:"Момент силы", category:"Механика", description:"Вращательное действие силы на рычаг.", formula:"M = F · d", unit:"Н·м", inputs:[{id:"F", label:"Сила F (Н)", val:50}, {id:"d", label:"Плечо силы d (м)", val:0.4}] },
    { id:"m57", title:"КПД механизма", category:"Механика", description:"Эффективность передачи энергии машиной.", formula:"η = (A_1 / A_2) · 100", unit:"%", inputs:[{id:"A1", label:"Полезная работа (Дж)", val:450}, {id:"A2", label:"Затраченная работа (Дж)", val:600}] },
    { id:"m58", title:"Гидравлический пресс", category:"Механика", description:"Выигрыш в силе за счет разности площадей поршней.", formula:"F_2 = F_1 · (S_2 / S_1)", unit:"Н", inputs:[{id:"F1", label:"Сила F₁ (Н)", val:100}, {id:"S1", label:"Площадь малая S₁ (м²)", val:0.001}, {id:"S2", label:"Площадь большая S₂ (м²)", val:0.025}] },
    { id:"m59", title:"Давление твердого тела", category:"Механика", description:"Сила распределенная по опорной площади.", formula:"P = F / S", unit:"Па", inputs:[{id:"F", label:"Сила F (Н)", val:500}, {id:"S", label:"Площадь S (м²)", val:0.2}] },
    { id:"mk1", title:"Количество вещества через массы", category:"МКТ", description:"Число молей порции газа или твердого тела.", formula:"ν = m / M", unit:"моль", inputs:[{id:"m", label:"Масса вещества m (г)", val:54}, {id:"M", label:"Молярная масса M (г/моль)", val:18}] },
    { id:"mk2", title:"Количество вещества через число частиц", category:"МКТ", description:"Число молей через постоянную Авогадро.", formula:"ν = N / N_A", unit:"моль", inputs:[{id:"N", label:"Кол-во молекул N", val:1.2e24}, {id:"NA", label:"Постоянная Авогадро N_A", val:6.022e23}] },
    { id:"mk3", title:"Относительная молекулярная масса", category:"МКТ", description:"Значение массы молекулы в а.е.м.", formula:"M_r = m_0 / (1/12 · m_0C)", unit:"", inputs:[{id:"m0", label:"Масса молекулы m₀ (кг)", val:2.99e-26}, {id:"m0C", label:"Масса углерода-12 m₀C (кг)", val:1.993e-26}] },
    { id:"mk3_2", title:"Масса одной молекулы", category:"МКТ", description:"Абсолютная масса одиночной структурной единицы.", formula:"m_0 = M / N_A", unit:"кг", inputs:[{id:"M", label:"Молярная масса M (кг/моль)", val:0.032}, {id:"NA", label:"Постоянная Авогадро N_A", val:6.022e23}] },
    { id:"mk4", title:"Молярная масса через относительную массу", category:"МКТ", description:"Масса одного моля вещества.", formula:"M = M_r · 0.001", unit:"кг/моль", inputs:[{id:"Mr", label:"Отн. молекулярная масса M_r", val:18}] },
    { id:"mk5", title:"Масса вещества через плотность", category:"МКТ", description:"Масса тела через его плотность и объём.", formula:"m = ρ · V", unit:"кг", inputs:[{id:"rho", label:"Плотность вещества ρ (кг/м³)", val:1.29}, {id:"V", label:"Объём V (м³)", val:2}] },
    { id:"mk6", title:"Плотность вещества через концентрацию", category:"МКТ", description:"Плотность вещества через массу одной молекулы.", formula:"ρ = m_0 · n", unit:"кг/м³", inputs:[{id:"m0", label:"Масса молекулы m₀ (кг)", val:4.65e-26}, {id:"n", label:"Концентрация n (м⁻³)", val:2.7e25}] },
    { id:"mk7", title:"Количество вещества через объём газа", category:"МКТ", description:"Отношение объёма газа к молярному объёму.", formula:"ν = V / V_m", unit:"моль", inputs:[{id:"V", label:"Объём газа V (м³)", val:0.0448}, {id:"Vm", label:"Молярный объём V_m (м³/моль)", val:0.0224}] },
    { id:"mk8", title:"Концентрация молекул", category:"МКТ", description:"Число молекул или атомов в единице объёма.", formula:"n = N / V", unit:"м⁻³", inputs:[{id:"N", label:"Число молекул N", val:6.02e23}, {id:"V", label:"Объём V (м³)", val:0.0224}] },
    { id:"mk9", title:"Основное уравнение МКТ (через квадрат скорости)", category:"МКТ", description:"Давление газа через массу, концентрацию и ср. кв. скорость.", formula:"p = 1/3 · m_0 · n · v_кв²", unit:"Па", inputs:[{id:"m0", label:"Масса молекулы m₀ (кг)", val:4.65e-26}, {id:"n", label:"Концентрация n (м⁻³)", val:2.7e25}, {id:"vкв", label:"Ср. кв. скорость v_кв (м/с)", val:500}] },
    { id:"mk10", title:"Основное уравнение МКТ (через температуру)", category:"МКТ", description:"Кинетическое давление тепловых ударов молекул.", formula:"P = n · k · T", unit:"Па", inputs:[{id:"n", label:"Концентрация n (м⁻³)", val:2.5e25}, {id:"k", label:"Постоянная Больцмана (Дж/К)", val:1.38e-23}, {id:"T", label:"Температура T (К)", val:273}] },
    { id:"mk11", title:"Основное уравнение МКТ (через энергию)", category:"МКТ", description:"Связь давления газа с кинетической энергией.", formula:"p = 2/3 · n · E", unit:"Па", inputs:[{id:"n", label:"Концентрация n (м⁻³)", val:2.7e25}, {id:"E", label:"Средняя энергия E (Дж)", val:6.2e-21}] },
    { id:"mk12", title:"Средняя квадратичная скорость (через молекулу)", category:"МКТ", description:"Скорость теплового движения через массу молекулы.", formula:"v_кв = √(3 · k · T / m_0)", unit:"м/с", inputs:[{id:"T", label:"Температура T (К)", val:300}, {id:"m0", label:"Масса молекулы m₀ (кг)", val:4.65e-26}, {id:"k", label:"Постоянная Больцмана k (Дж/К)", val:1.38e-23}] },
    { id:"mk13", title:"Средняя квадратичная скорость (через моль)", category:"МКТ", description:"Скорость хаотического теплового дрейфа.", formula:"v_кв = √(3 · R · T / M)", unit:"м/с", inputs:[{id:"T", label:"Температура T (К)", val:293}, {id:"R", label:"Газовая постоянная R", val:8.314}, {id:"M", label:"Молярная масса M (кг/моль)", val:0.028}] },
    { id:"mk14", title:"Средняя кинетическая энергия молекул", category:"МКТ", description:"Энергия поступательного теплового хаоса частиц.", formula:"E_к = 3/2 · k · T", unit:"Дж", inputs:[{id:"k", label:"Постоянная Больцмана k", val:1.38e-23}, {id:"T", label:"Температура T (К)", val:300}] },
    { id:"mk15", title:"Давление газа (Менделеев-Клапейрон)", category:"МКТ", description:"Давление идеального газа через массу.", formula:"p = (m · R · T) / (M · V)", unit:"Па", inputs:[{id:"m", label:"Масса m (кг)", val:0.032}, {id:"V", label:"Объём V (м³)", val:0.0224}, {id:"M", label:"Молярная масса M (кг/моль)", val:0.032}, {id:"T", label:"Температура T (К)", val:273.15}, {id:"R", label:"Газовая постоянная R", val:8.31}] },
    { id:"mk16", title:"Объём газа (Менделеев-Клапейрон)", category:"МКТ", description:"Объём идеального газа через массу.", formula:"V = (m · R · T) / (M · p)", unit:"м³", inputs:[{id:"m", label:"Масса m (кг)", val:0.032}, {id:"p", label:"Давление p (Па)", val:101325}, {id:"M", label:"Молярная масса M (кг/моль)", val:0.032}, {id:"T", label:"Температура T (К)", val:273.15}, {id:"R", label:"Газовая постоянная R", val:8.31}] },
    { id:"mk17", title:"Уравнение Менделеева-Клапейрона", category:"МКТ", description:"Связывает термодинамические параметры газа.", formula:"P = (ν · R · T) / V", unit:"Па", inputs:[{id:"nu", label:"Кол-во вещества ν (моль)", val:2}, {id:"R", label:"Газовая постоянная R", val:8.314}, {id:"T", label:"Температура T (К)", val:300}, {id:"V", label:"Объем V (м³)", val:0.05}] },
    { id:"mk18", title:"Уравнение Клапейрона (Базовое)", category:"МКТ", description:"Отношение произведения давления на объём к абсолютной температуре постоянно.", formula:"C = (P · V) / T", unit:"Дж/К", inputs:[{id:"P", label:"Давление P (Па)", val:100000}, {id:"V", label:"Объём V (м³)", val:2}, {id:"T", label:"Температура T (К)", val:293}] },
    { id:"mk18_1", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение давления P₁.", formula:"P_1 = (P_2 · V_2 · T_1) / (V_1 · T_2)", unit:"Па", inputs:[{id:"P2", label:"P₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"T1", label:"T₁ (К)", val:293}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}] },
    { id:"mk18_2", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение объёма V₁.", formula:"V_1 = (P_2 · V_2 · T_1) / (P_1 · T_2)", unit:"м³", inputs:[{id:"P2", label:"P₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"T1", label:"T₁ (К)", val:293}, {id:"P1", label:"P₁ (Па)", val:100000}, {id:"T2", label:"T₂ (К)", val:350}] },
    { id:"mk18_3", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение температуры T₁.", formula:"T_1 = (P_1 · V_1 · T_2) / (P_2 · V_2)", unit:"К", inputs:[{id:"P1", label:"P₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}, {id:"P2", label:"P₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}] },
    { id:"mk18_4", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение давления P₂.", formula:"P_2 = (P_1 · V_1 · T_2) / (V_2 · T_1)", unit:"Па", inputs:[{id:"P1", label:"P₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"T1", label:"T₁ (К)", val:293}] },
    { id:"mk18_5", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение объёма V₂.", formula:"V_2 = (P_1 · V_1 · T_2) / (P_2 · T_1)", unit:"м³", inputs:[{id:"P1", label:"P₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}, {id:"P2", label:"P₂ (Па)", val:150000}, {id:"T1", label:"T₁ (К)", val:293}] },
    { id:"mk18_6", title:"Уравнение Клапейрона (Объединенный закон)", category:"МКТ", description:"Нахождение температуры T₂.", formula:"T_2 = (P_2 · V_2 · T_1) / (P_1 · V_1)", unit:"К", inputs:[{id:"P2", label:"P₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"T1", label:"T₁ (К)", val:293}, {id:"P1", label:"P₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}] },
    { id:"mk19_1", title:"Закон Бойля-Мариотта (Изотермический)", category:"МКТ", description:"Нахождение давления p₁.", formula:"p_1 = (p_2 · V_2) / V_1", unit:"Па", inputs:[{id:"p2", label:"p₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"V1", label:"V₁ (м³)", val:2}] },
    { id:"mk19_2", title:"Закон Бойля-Мариотта (Изотермический)", category:"МКТ", description:"Нахождение объёма V₁.", formula:"V_1 = (p_2 · V_2) / p_1", unit:"м³", inputs:[{id:"p2", label:"p₂ (Па)", val:150000}, {id:"V2", label:"V₂ (м³)", val:1}, {id:"p1", label:"p₁ (Па)", val:100000}] },
    { id:"mk19_3", title:"Закон Бойля-Мариотта (Изотермический)", category:"МКТ", description:"Нахождение давления p₂.", formula:"p_2 = (p_1 · V_1) / V_2", unit:"Па", inputs:[{id:"p1", label:"p₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"V2", label:"V₂ (м³)", val:1}] },
    { id:"mk19_4", title:"Закон Бойля-Мариотта (Изотермический)", category:"МКТ", description:"Нахождение объёма V₂.", formula:"V_2 = (p_1 · V_1) / p_2", unit:"м³", inputs:[{id:"p1", label:"p₁ (Па)", val:100000}, {id:"V1", label:"V₁ (м³)", val:2}, {id:"p2", label:"p₂ (Па)", val:150000}] },
    { id:"mk20_1", title:"Закон Шарля (Изохорный)", category:"МКТ", description:"Нахождение давления p₁.", formula:"p_1 = (p_2 · T_1) / T_2", unit:"Па", inputs:[{id:"p2", label:"p₂ (Па)", val:150000}, {id:"T1", label:"T₁ (К)", val:293}, {id:"T2", label:"T₂ (К)", val:350}] },
    { id:"mk20_2", title:"Закон Шарля (Изохорный)", category:"МКТ", description:"Нахождение температуры T₁.", formula:"T_1 = (p_1 · T_2) / p_2", unit:"К", inputs:[{id:"p1", label:"p₁ (Па)", val:100000}, {id:"T2", label:"T₂ (К)", val:350}, {id:"p2", label:"p₂ (Па)", val:150000}] },
    { id:"mk20_3", title:"Закон Шарля (Изохорный)", category:"МКТ", description:"Нахождение давления p₂.", formula:"p_2 = (p_1 · T_2) / T_1", unit:"Па", inputs:[{id:"p1", label:"p₁ (Па)", val:100000}, {id:"T2", label:"T₂ (К)", val:350}, {id:"T1", label:"T₁ (К)", val:293}] },
    { id:"mk20_4", title:"Закон Шарля (Изохорный)", category:"МКТ", description:"Нахождение температуры T₂.", formula:"T_2 = (p_2 · T_1) / p_1", unit:"К", inputs:[{id:"p2", label:"p₂ (Па)", val:150000}, {id:"T1", label:"T₁ (К)", val:293}, {id:"p1", label:"p₁ (Па)", val:100000}] },
    { id:"mk21_1", title:"Закон Гей-Люссака (Изобарный)", category:"МКТ", description:"Нахождение объёма V₁.", formula:"V_1 = (V_2 · T_1) / T_2", unit:"м³", inputs:[{id:"V2", label:"V₂ (м³)", val:1.5}, {id:"T1", label:"T₁ (К)", val:293}, {id:"T2", label:"T₂ (К)", val:350}] },
    { id:"mk21_2", title:"Закон Гей-Люссака (Изобарный)", category:"МКТ", description:"Нахождение температуры T₁.", formula:"T_1 = (V_1 · T_2) / V_2", unit:"К", inputs:[{id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}, {id:"V2", label:"V₂ (м³)", val:1.5}] },
    { id:"mk21_3", title:"Закон Гей-Люссака (Изобарный)", category:"МКТ", description:"Нахождение объёма V₂.", formula:"V_2 = (V_1 · T_2) / T_1", unit:"м³", inputs:[{id:"V1", label:"V₁ (м³)", val:2}, {id:"T2", label:"T₂ (К)", val:350}, {id:"T1", label:"T₁ (К)", val:293}] },
    { id:"mk21_4", title:"Закон Гей-Люссака (Изобарный)", category:"МКТ", description:"Нахождение температуры T₂.", formula:"T_2 = (V_2 · T_1) / V_1", unit:"К", inputs:[{id:"V2", label:"V₂ (м³)", val:1.5}, {id:"T1", label:"T₁ (К)", val:293}, {id:"V1", label:"V₁ (м³)", val:2}] },
    { id:"mk22", title:"Относительная влажность (через давление)", category:"МКТ", description:"Отношение парциального давления к давлению насыщения.", formula:"φ = (p / p_0) · 100", unit:"%", inputs:[{id:"p", label:"Давление пара p (Па)", val:1200}, {id:"p0", label:"Насыщенный пар p₀ (Па)", val:2330}] },
    { id:"mk23", title:"Относительная влажность (через плотность)", category:"МКТ", description:"Отношение абсолютной влажности к плотности насыщения.", formula:"φ = (ρ / ρ_0) · 100", unit:"%", inputs:[{id:"rho", label:"Плотность пара ρ (г/м³)", val:9.4}, {id:"rho0", label:"Плотн. насыщения ρ₀ (г/м³)", val:17.3}] },
    { id:"mk24", title:"Абсолютная влажность воздуха", category:"МКТ", description:"Масса водяного пара в единице объёма воздуха.", formula:"ρ_a = m / V", unit:"г/м³", inputs:[{id:"m", label:"Масса пара m (г)", val:15}, {id:"V", label:"Объём воздуха V (м³)", val:1}] },
    { id:"mk25", title:"Объемное тепловое расширение жидкостей", category:"МКТ", description:"Изменение объема жидкости при тепловом воздействии.", formula:"ΔV = β · V_0 · ΔT", unit:"м³", inputs:[{id:"beta", label:"Коэффициент β (К⁻¹)", val:2.1e-4}, {id:"V0", label:"Нач. объем V₀ (м³)", val:0.01}, {id:"dT", label:"Нагрев ΔT (К)", val:40}] },
    { id:"t1", title:"Внутренняя энергия одноатомного газа", category:"Термодинамика", description:"Суммарная тепловая энергия идеальной газовой системы.", formula:"U = 3/2 · ν · R · T", unit:"Дж", inputs:[{id:"nu", label:"Кол-во вещества ν (моль)", val:4}, {id:"R", label:"Газовая постоянная R", val:8.314}, {id:"T", label:"Температура T (К)", val:300}] },
    { id:"t2", title:"Внутренняя энергия двухатомного газа", category:"Термодинамика", description:"Внутренняя энергия идеального двухатомного газа.", formula:"U = 5/2 · ν · R · T", unit:"Дж", inputs:[{id:"nu", label:"Кол-во вещества ν (моль)", val:2}, {id:"R", label:"Газовая постоянная R", val:8.314}, {id:"T", label:"Температура T (К)", val:300}] },
    { id:"t3", title:"Работа газа при изобарном процессе", category:"Термодинамика", description:"Работа газа при постоянном давлении через изменение объёма.", formula:"A_gas = p · ΔV", unit:"Дж", inputs:[{id:"p", label:"Давление p (Па)", val:100000}, {id:"dV", label:"Изменение объёма ΔV (м³)", val:0.005}] },
    { id:"t4", title:"Работа внешних сил над газом", category:"Термодинамика", description:"Работа внешних сил при постоянном давлении.", formula:"A_ext = -p · ΔV", unit:"Дж", inputs:[{id:"p", label:"Давление p (Па)", val:100000}, {id:"dV", label:"Изменение объёма ΔV (м³)", val:0.005}] },
    { id:"t5", title:"Теплота плавления или кристаллизации", category:"Термодинамика", description:"Теплота изменения агрегатного состояния вещества.", formula:"Q = λ · m", unit:"Дж", inputs:[{id:"lambda", label:"Уд. теплота λ (Дж/кг)", val:334000}, {id:"m", label:"Масса m (кг)", val:2}] },
    { id:"t6", title:"Теплота парообразования", category:"Термодинамика", description:"Теплота кипения жидкости.", formula:"Q = L · m", unit:"Дж", inputs:[{id:"L", label:"Уд. теплота L (Дж/кг)", val:2260000}, {id:"m", label:"Масса m (кг)", val:0.5}] },
    { id:"t7", title:"Теплота сгорания топлива", category:"Термодинамика", description:"Теплота, выделяемая при полном сгорании топлива.", formula:"Q = q · m", unit:"Дж", inputs:[{id:"q", label:"Уд. теплота сгорания q", val:44000000}, {id:"m", label:"Масса m (кг)", val:3}] },
    { id:"t8", title:"Теплота нагревания или охлаждения", category:"Термодинамика", description:"Теплота, поглощаемая веществом при нагревании.", formula:"Q = c · m · (T_2 - T_1)", unit:"Дж", inputs:[{id:"c", label:"Уд. теплоёмкость c", val:4200}, {id:"m", label:"Масса m (кг)", val:2}, {id:"T1", label:"Нач. температура T₁", val:20}, {id:"T2", label:"Кон. температура T₂", val:80}] },
    { id:"t9", title:"Линейное тепловое расширение", category:"Термодинамика", description:"Зависимость длины тела от температуры.", formula:"l = l_0 · (1 + α · t)", unit:"м", inputs:[{id:"l0", label:"Нач. длина l₀ (м)", val:10}, {id:"alpha", label:"Коэффициент α (1/°C)", val:1.2e-5}, {id:"t", label:"Температура t (°C)", val:50}] },
    { id:"t10", title:"Поверхностное тепловое расширение", category:"Термодинамика", description:"Зависимость площади от температуры.", formula:"S = S_0 · (1 + 2 · α · t)", unit:"м²", inputs:[{id:"S0", label:"Нач. площадь S₀ (м²)", val:5}, {id:"alpha", label:"Коэффициент α (1/°C)", val:1.2e-5}, {id:"t", label:"Температура t (°C)", val:50}] },
    { id:"t11", title:"Объёмное тепловое расширение", category:"Термодинамика", description:"Зависимость объёма тела от температуры.", formula:"V = V_0 · (1 + 3 · α · t)", unit:"м³", inputs:[{id:"V0", label:"Нач. объём V₀ (м³)", val:0.02}, {id:"alpha", label:"Коэффициент α (1/°C)", val:1.2e-5}, {id:"t", label:"Температура t (°C)", val:50}] },
    { id:"t12", title:"Первый закон термодинамики", category:"Термодинамика", description:"Закон сохранения энергии тепловой макросистемы.", formula:"ΔU = Q - A_gas", unit:"Дж", inputs:[{id:"Q", label:"Подведенное тепло Q (Дж)", val:5000}, {id:"Agas", label:"Работа газа A (Дж)", val:2000}] },
    { id:"t13", title:"КПД теплового двигателя", category:"Термодинамика", description:"Термическая эффективность циклической машины.", formula:"η = ((Q_1 - Q_2) / Q_1) · 100", unit:"%", inputs:[{id:"Q1", label:"От нагревателя Q₁ (Дж)", val:1000}, {id:"Q2", label:"Холодильнику Q₂ (Дж)", val:600}] },
    { id:"t14", title:"Максимальный КПД (цикл Карно)", category:"Термодинамика", description:"Теоретический предел термодинамической эффективности.", formula:"η_max = ((T_1 - T_2) / T_1) · 100", unit:"%", inputs:[{id:"T1", label:"Нагреватель T₁ (К)", val:600}, {id:"T2", label:"Холодильник T₂ (К)", val:300}] },
    { id:"e1", title:"Закон Кулона для вакуума", category:"Электродинамика", description:"Сила взаимодействия двух точечных зарядов.", formula:"F = k · (abs(q_1) · abs(q_2) ) / ( r²)", unit:"Н", inputs:[{id:"q1", label:"Заряд q₁ (Кл)", val:1e-6}, {id:"q2", label:"Заряд q₂ (Кл)", val:1e-6}, {id:"r", label:"Расстояние r (м)", val:0.1}, {id:"k", label:"Коэффициент k", val:9e9}] },
    { id:"e2", title:"Заряд тела", category:"Электродинамика", description:"Электрический заряд через количество электронов.", formula:"q = N · e", unit:"Кл", inputs:[{id:"N", label:"Кол-во частиц N", val:1e13}] },
    { id:"e3", title:"Напряжённость поля", category:"Электродинамика", description:"Силовая характеристика электрического поля.", formula:"E = F / q", unit:"В/м", inputs:[{id:"F", label:"Сила Кулона F (Н)", val:0.05}, {id:"q", label:"Заряд q (Кл)", val:1e-6}] },
    { id:"e4", title:"Напряженность точечного заряда", category:"Электродинамика", description:"Силовая векторная характеристика кулоновского поля.", formula:"E = k · q / r²", unit:"В/м", inputs:[{id:"k", label:"Коэффициент k", val:9e9}, {id:"q", label:"Заряд q (Кл)", val:1e-9}, {id:"r", label:"Расстояние r (м)", val:0.05}] },
    { id:"e5", title:"Напряжённость однородного поля", category:"Электродинамика", description:"Связь напряжённости с разностью потенциалов.", formula:"E = U / d", unit:"В/м", inputs:[{id:"U", label:"Напряжение U (В)", val:220}, {id:"d", label:"Расстояние d (м)", val:0.02}] },
    { id:"e6", title:"Потенциальная энергия заряда", category:"Электродинамика", description:"Энергия точечного заряда в однородном поле.", formula:"W_p = q · E · d", unit:"Дж", inputs:[{id:"q", label:"Заряд q (Кл)", val:1e-6}, {id:"E", label:"Напряжённость E (В/м)", val:50000}, {id:"d", label:"Расстояние d (м)", val:0.1}] },
    { id:"e7", title:"Работа электрического поля", category:"Электродинамика", description:"Работа поля по перемещению заряда.", formula:"A = q · U", unit:"Дж", inputs:[{id:"q", label:"Заряд q (Кл)", val:2e-4}, {id:"U", label:"Напряжение U (В)", val:50}] },
    { id:"e8", title:"Потенциал электростатического поля", category:"Электродинамика", description:"Энергетическая скалярная характеристика поля.", formula:"φ = W / q", unit:"В", inputs:[{id:"W", label:"Энергия W (Дж)", val:0.005}, {id:"q", label:"Заряд q (Кл)", val:5e-6}] },
    { id:"e9", title:"Емкость плоского конденсатора", category:"Электродинамика", description:"Электроемкость проводящих обкладок.", formula:"C = ε · ε_0 · S / d", unit:"Ф", inputs:[{id:"eps", label:"Диэл. проницаемость ε", val:1}, {id:"eps0", label:"Константа ε₀", val:8.854e-12}, {id:"S", label:"Площадь S (м²)", val:0.01}, {id:"d", label:"Зазор d (м)", val:0.001}] },
    { id:"e10", title:"Электроёмкость проводника", category:"Электродинамика", description:"Способность накапливать электрический заряд.", formula:"C = q / U", unit:"Ф", inputs:[{id:"q", label:"Заряд q (Кл)", val:1e-6}, {id:"U", label:"Напряжение U (В)", val:100}] },
    { id:"e11", title:"Последовательные конденсаторы (2 шт)", category:"Электродинамика", description:"Общая емкость двух последовательных конденсаторов.", formula:"C_{общ} = (C_1 · C_2) / (C_1 + C_2)", unit:"Ф", inputs:[{id:"C1", label:"Емкость C₁ (Ф)", val:1e-5}, {id:"C2", label:"Емкость C₂ (Ф)", val:2e-5}] },
    { id:"e12", title:"Последовательные конденсаторы (3 шт)", category:"Электродинамика", description:"Общая емкость трёх последовательных конденсаторов.", formula:"C_{общ} = (1)/( 1/C_1 + 1/C_2 + 1/C_3 )", unit:"Ф", inputs:[{id:"C1", label:"Емкость C₁ (Ф)", val:1e-5}, {id:"C2", label:"Емкость C₂ (Ф)", val:2e-5}, {id:"C3", label:"Емкость C₃ (Ф)", val:2e-5}] },
    { id:"e13", title:"Параллельные конденсаторы", category:"Электродинамика", description:"Общая электроёмкость параллельных конденсаторов.", formula:"C_{общ} = C_1 + C_2 + C_3", unit:"Ф", inputs:[{id:"C1", label:"Емкость C₁ (Ф)", val:1e-5}, {id:"C2", label:"Емкость C₂ (Ф)", val:2e-5}, {id:"C3", label:"Емкость C₃ (Ф)", val:2e-5}] },
    { id:"e14", title:"Энергия конденсатора (через напряжение)", category:"Электродинамика", description:"Потенциальная энергия в диэлектрике.", formula:"W_c = C · U² / 2", unit:"Дж", inputs:[{id:"C", label:"Емкость C (Ф)", val:2.2e-5}, {id:"U", label:"Напряжение U (В)", val:16}] },
    { id:"e15", title:"Энергия конденсатора (через заряд)", category:"Электродинамика", description:"Потенциальная энергия конденсатора.", formula:"W_c = (q · U) / 2", unit:"Дж", inputs:[{id:"q", label:"Заряд q (Кл)", val:1e-6}, {id:"U", label:"Напряжение U (В)", val:100}] },
    { id:"e16", title:"Сила тока", category:"Электродинамика", description:"Отношение заряда ко времени его прохождения.", formula:"I = q / t", unit:"А", inputs:[{id:"q", label:"Заряд q (Кл)", val:5e-6}, {id:"t", label:"Время t (с)", val:2}] },
    { id:"e17", title:"Сила тока через мощность", category:"Электродинамика", description:"Расчет силы тока через мощность.", formula:"I = P / U", unit:"А", inputs:[{id:"P", label:"Мощность P (Вт)", val:2200}, {id:"U", label:"Напряжение U (В)", val:220}] },
    { id:"e18", title:"Закон Ома для участка цепи", category:"Электродинамика", description:"Зависимость тока от напряжения и сопротивления.", formula:"I = U / R", unit:"А", inputs:[{id:"U", label:"Напряжение U (В)", val:12}, {id:"R", label:"Сопротивление R (Ом)", val:6}] },
    { id:"e19", title:"Закон Ома для полной цепи", category:"Электродинамика", description:"Сила тока от источника с учётом вн. сопротивления.", formula:"I = ε / (R + r)", unit:"А", inputs:[{id:"eps", label:"ЭДС ε (В)", val:4.5}, {id:"R", label:"Внешнее сопр. R (Ом)", val:4}, {id:"r", label:"Внутреннее сопр. r (Ом)", val:0.5}] },
    { id:"e20", title:"Напряжение через работу тока", category:"Электродинамика", description:"Напряжение через работу электрического поля.", formula:"U = A / q", unit:"В", inputs:[{id:"A", label:"Работа A (Дж)", val:0.05}, {id:"q", label:"Заряд q (Кл)", val:1e-4}] },
    { id:"e21", title:"Напряжение через закон Ома", category:"Электродинамика", description:"Падение напряжения на участке.", formula:"U = I · R", unit:"В", inputs:[{id:"I", label:"Сила тока I (А)", val:2}, {id:"R", label:"Сопротивление R (Ом)", val:10}] },
    { id:"e22", title:"Напряжение через мощность", category:"Электродинамика", description:"Напряжение по известной мощности.", formula:"U = P / I", unit:"В", inputs:[{id:"P", label:"Мощность P (Вт)", val:500}, {id:"I", label:"Сила тока I (А)", val:2.5}] },
    { id:"e23", title:"Ток короткого замыкания", category:"Электродинамика", description:"Предельный ток при нулевом внешнем сопротивлении.", formula:"I_{кз} = (ε) / r", unit:"А", inputs:[{id:"eps", label:"ЭДС ε (В)", val:12}, {id:"r", label:"Внутр. сопротивление r (Ом)", val:0.2}] },
    { id:"e24", title:"Сопротивление проводника", category:"Электродинамика", description:"Омическое сопротивление кабельной линии.", formula:"R = ρ · l / S", unit:"Ом", inputs:[{id:"rho", label:"Удельное сопр. ρ (Ом·м)", val:1.75e-8}, {id:"l", label:"Длина l (м)", val:50}, {id:"S", label:"Сечение S (м²)", val:1.5e-6}] },
    { id:"e25", title:"Последовательные резисторы (2 шт)", category:"Электродинамика", description:"Общее омическое сопротивление.", formula:"R_{общ} = R_1 + R_2", unit:"Ом", inputs:[{id:"R1", label:"R₁ (Ом)", val:10}, {id:"R2", label:"R₂ (Ом)", val:22}] },
    { id:"e26", title:"Параллельные резисторы (2 шт)", category:"Электродинамика", description:"Общее сопротивление двух параллельных ветвей.", formula:"R_{общ} = (R_1 · R_2) / (R_1 + R_2)", unit:"Ом", inputs:[{id:"R1", label:"R₁ (Ом)", val:10}, {id:"R2", label:"R₂ (Ом)", val:10}] },
    { id:"e37", title:"Работа тока через мощность", category:"Электродинамика", description:"Работа электрического тока через мощность и время.", formula:"A = P · t", unit:"Дж", inputs:[{id:"P", label:"Мощность P (Вт)", val:100}, {id:"t", label:"Время t (с)", val:60}] },
    { id:"e28", title:"Закон Джоуля-Ленца", category:"Электродинамика", description:"Количество теплоты в проводнике.", formula:"A = I² · R · t", unit:"Дж", inputs:[{id:"I", label:"Сила тока I (А)", val:2}, {id:"R", label:"Сопротивление R (Ом)", val:5}, {id:"t", label:"Время t (с)", val:10}] },
    { id:"e29", title:"Работа тока (I, U)", category:"Электродинамика", description:"Работа тока на участке цепи.", formula:"A = I · U · t", unit:"Дж", inputs:[{id:"I", label:"Сила тока I (А)", val:1.5}, {id:"U", label:"Напряжение U (В)", val:220}, {id:"t", label:"Время t (с)", val:30}] },
    { id:"e30", title:"Работа тока (U, R)", category:"Электродинамика", description:"Работа тока через сопротивление.", formula:"A = (U² · t) / R", unit:"Дж", inputs:[{id:"U", label:"Напряжение U (В)", val:12}, {id:"t", label:"Время t (с)", val:10}, {id:"R", label:"Сопротивление R (Ом)", val:4}] },
    { id:"e31", title:"Мощность тока", category:"Электродинамика", description:"Скорость передачи электроэнергии.", formula:"P = A / t", unit:"Вт", inputs:[{id:"A", label:"Работа A (Дж)", val:3000}, {id:"t", label:"Время t (с)", val:60}] },
    { id:"e32", title:"Мощность (I, U)", category:"Электродинамика", description:"Электрическая мощность по току и напряжению.", formula:"P = U · I", unit:"Вт", inputs:[{id:"U", label:"Напряжение U (В)", val:220}, {id:"I", label:"Сила тока I (А)", val:4.5}] },
    { id:"e33", title:"Мощность (U, R)", category:"Электродинамика", description:"Мощность тока при известном сопротивлении.", formula:"P = U² / R", unit:"Вт", inputs:[{id:"U", label:"Напряжение U (В)", val:220}, {id:"R", label:"Сопротивление R (Ом)", val:484}] },
    { id:"e34", title:"Мощность (I, R)", category:"Электродинамика", description:"Выделяющаяся тепловая мощность.", formula:"P = I² · R", unit:"Вт", inputs:[{id:"I", label:"Сила тока I (А)", val:2}, {id:"R", label:"Сопротивление R (Ом)", val:10}] },
    { id:"e35", title:"Мощность источника (ε, I)", category:"Электродинамика", description:"Полная мощность отдаваемая источником.", formula:"P_{полн} = ε · I", unit:"Вт", inputs:[{id:"eps", label:"ЭДС ε (В)", val:12}, {id:"I", label:"Сила тока I (А)", val:2}] },
    { id:"e36", title:"Мощность источника (I, R)", category:"Электродинамика", description:"Полная мощность через сопротивления.", formula:"P_{полн} = I² · (R + r)", unit:"Вт", inputs:[{id:"I", label:"Сила тока I (А)", val:2}, {id:"R", label:"Внешнее сопр. R (Ом)", val:5}, {id:"r", label:"Внутр. сопр. r (Ом)", val:1}] },
    { id:"e37b", title:"Мощность источника (ε, R)", category:"Электродинамика", description:"Полная мощность через полное сопротивление.", formula:"P_{полн} = ε² / (R + r)", unit:"Вт", inputs:[{id:"eps", label:"ЭДС ε (В)", val:12}, {id:"R", label:"Внешнее сопр. R (Ом)", val:5}, {id:"r", label:"Внутр. сопр. r (Ом)", val:1}] },
    { id:"e38", title:"Скорость дрейфа электронов", category:"Электродинамика", description:"Скорость упорядоченного движения электронов.", formula:"v = I / (e · n · S)", unit:"м/с", inputs:[{id:"I", label:"Сила тока I (А)", val:1}, {id:"n", label:"Концентрация n (м⁻³)", val:8.5e28}, {id:"S", label:"Площадь сечения S (м²)", val:1e-6}] },
    { id:"e39", title:"ЭДС источника тока", category:"Электродинамика", description:"ЭДС через работу сторонних сил.", formula:"ε = A_ст / q", unit:"В", inputs:[{id:"Aст", label:"Работа стор. сил (Дж)", val:12}, {id:"q", label:"Заряд q (Кл)", val:2}] },
    { id:"e40", title:"Теплота (I, R)", category:"Электродинамика", description:"Закон Джоуля-Ленца.", formula:"Q = I² · R · t", unit:"Дж", inputs:[{id:"I", label:"Сила тока I (А)", val:2}, {id:"R", label:"Сопротивление R (Ом)", val:10}, {id:"t", label:"Время t (с)", val:60}] },
    { id:"e41", title:"Теплота (I, U)", category:"Электродинамика", description:"Теплота через напряжение.", formula:"Q = I · U · t", unit:"Дж", inputs:[{id:"I", label:"Сила тока I (А)", val:1.5}, {id:"U", label:"Напряжение U (В)", val:220}, {id:"t", label:"Время t (с)", val:30}] },
    { id:"e42", title:"Теплота (U, R)", category:"Электродинамика", description:"Теплота при известном сопротивлении.", formula:"Q = (U² · t) / R", unit:"Дж", inputs:[{id:"U", label:"Напряжение U (В)", val:12}, {id:"t", label:"Время t (с)", val:10}, {id:"R", label:"Сопротивление R (Ом)", val:4}] },
    { id:"e43", title:"Напряжение (последовательно)", category:"Электродинамика", description:"Общее напряжение на цепочке.", formula:"U = U_1 + U_2 + U_3", unit:"В", inputs:[{id:"U1", label:"U₁ (В)", val:5}, {id:"U2", label:"U₂ (В)", val:3}, {id:"U3", label:"U₃ (В)", val:4}] },
    { id:"e44", title:"Сопротивление (последовательно)", category:"Электродинамика", description:"Сумма сопротивлений.", formula:"R = R_1 + R_2 + R_3", unit:"Ом", inputs:[{id:"R1", label:"R₁ (Ом)", val:10}, {id:"R2", label:"R₂ (Ом)", val:20}, {id:"R3", label:"R₃ (Ом)", val:15}] },
    { id:"e45", title:"Сопротивление (2 параллельно)", category:"Электродинамика", description:"Сопротивление двух параллельных.", formula:"R = (R_1 · R_2) / (R_1 + R_2)", unit:"Ом", inputs:[{id:"R1", label:"R₁ (Ом)", val:12}, {id:"R2", label:"R₂ (Ом)", val:6}] },
    { id:"e46", title:"Сопротивление (3 параллельно)", category:"Электродинамика", description:"Сопротивление трёх параллельных.", formula:"R = (1) / ( 1/R_1 + 1/R_2 + 1/R_3)", unit:"Ом", inputs:[{id:"R1", label:"R₁ (Ом)", val:10}, {id:"R2", label:"R₂ (Ом)", val:20}, {id:"R3", label:"R₃ (Ом)", val:20}] },
    { id:"e47", title:"Сила тока (параллельно)", category:"Электродинамика", description:"Сила тока в неразветвленной части.", formula:"I = I_1 + I_2 + I_3", unit:"А", inputs:[{id:"I1", label:"I₁ (А)", val:1.5}, {id:"I2", label:"I₂ (А)", val:2}, {id:"I3", label:"I₃ (А)", val:0.5}] },
    { id:"e48", title:"Магнитная индукция витка", category:"Электродинамика", description:"Поле в центре кругового витка.", formula:"B = (μ_0 · I) / (2 · R)", unit:"Тл", inputs:[{id:"I", label:"Сила тока I (А)", val:5}, {id:"R", label:"Радиус витка R (м)", val:0.05}] },
    { id:"e49", title:"Радиус траектории заряда в поле", category:"Электродинамика", description:"Радиус окружности в магнитном поле.", formula:"R = (m · v) / (q · B)", unit:"м", inputs:[{id:"m", label:"Масса m (кг)", val:9.1e-31}, {id:"v", label:"Скорость v (м/с)", val:2e6}, {id:"q", label:"Заряд q (Кл)", val:1.6e-19}, {id:"B", label:"Индукция B (Тл)", val:0.1}] },
    { id:"e50", title:"Плотность тока", category:"Электродинамика", description:"Ток на единицу площади сечения.", formula:"j = I / S", unit:"А/м²", inputs:[{id:"I", label:"Ток I (А)", val:15}, {id:"S", label:"Сечение S (м²)", val:2.5e-6}] },
    { id:"e51", title:"Напряжение реального источника", category:"Электродинамика", description:"Выходное напряжение под нагрузкой.", formula:"U = E - I · r", unit:"В", inputs:[{id:"E", label:"ЭДС E (В)", val:12}, {id:"I", label:"Ток I (А)", val:2}, {id:"r", label:"Внутр. сопр. r (Ом)", val:0.5}] },
    { id:"e52", title:"Закон Ома для замкнутой цепи", category:"Электродинамика", description:"Ток с учетом внутреннего сопротивления.", formula:"I = E / (R + r)", unit:"А", inputs:[{id:"E", label:"ЭДС E (В)", val:24}, {id:"R", label:"Нагрузка R (Ом)", val:11.5}, {id:"r", label:"Внутр. сопр. r (Ом)", val:0.5}] },
    { id:"e53", title:"Вращающий момент рамки с током", category:"Электродинамика", description:"Момент сил в магнитном поле.", formula:"M = B · I · S · sin(α)", unit:"Н·м", inputs:[{id:"B", label:"Индукция B (Тл)", val:0.5}, {id:"I", label:"Сила тока I (А)", val:2}, {id:"S", label:"Площадь рамки S (м²)", val:0.01}, {id:"alpha", label:"Угол α (градусы)", val:90}] },
    { id:"e54", title:"КПД источника электроэнергии", category:"Электродинамика", description:"Эффективность генератора во внешнюю цепь.", formula:"η = R / (R + r) · 100", unit:"%", inputs:[{id:"R", label:"Нагрузка R (Ом)", val:8}, {id:"r", label:"Внутреннее r (Ом)", val:2}] },
    { id:"e55", title:"Магнитный поток", category:"Электродинамика", description:"Поток сквозь контур площади S.", formula:"Φ = B · S · cos(α)", unit:"Вб", inputs:[{id:"B", label:"Индукция B (Тл)", val:0.5}, {id:"S", label:"Площадь S (м²)", val:0.04}, {id:"alpha", label:"Угол α (градусы)", val:0}] },
    { id:"e56", title:"Сила Лоренца", category:"Электродинамика", description:"Сила на летящую частицу в магнитном поле.", formula:"F_L = q · v · B · sin(α)", unit:"Н", inputs:[{id:"q", label:"Заряд q (Кл)", val:1.6e-19}, {id:"v", label:"Скорость v (м/с)", val:2e6}, {id:"B", label:"Индукция B (Тл)", val:0.3}, {id:"alpha", label:"Угол α (градусы)", val:90}] },
    { id:"e57", title:"Сила Ампера", category:"Электродинамика", description:"Сила на проводник с током в магнитном поле.", formula:"F_A = I · B · l · sin(α)", unit:"Н", inputs:[{id:"I", label:"Ток I (А)", val:5}, {id:"B", label:"Индукция B (Тл)", val:0.2}, {id:"l", label:"Длина l (м)", val:0.4}, {id:"alpha", label:"Угол α (градусы)", val:90}] },
    { id:"e58", title:"Индукция в центре кругового витка", category:"Электродинамика", description:"Магнитное поле кольцевого тока.", formula:"B = mu0 · I / (2 · R)", unit:"Тл", inputs:[{id:"I", label:"Ток кольца I (А)", val:10}, {id:"R", label:"Радиус R (м)", val:0.05}] },
    { id:"e59", title:"Индукция соленоида", category:"Электродинамика", description:"Поле внутри длинной катушки.", formula:"B = μ · mu0 · N · I / l", unit:"Тл", inputs:[{id:"mu", label:"Проницаемость μ", val:1}, {id:"N", label:"Витки N", val:500}, {id:"I", label:"Ток I (А)", val:2}, {id:"l", label:"Длина l (м)", val:0.2}] },
    { id:"e60", title:"Индуктивность соленоида", category:"Электродинамика", description:"Геометрический расчет индуктивности.", formula:"L = μ · mu0 · N² · S / l", unit:"Гн", inputs:[{id:"mu", label:"Проницаемость μ", val:1}, {id:"N", label:"Витки N", val:1000}, {id:"S", label:"Площадь S (м²)", val:0.001}, {id:"l", label:"Длина l (м)", val:0.2}] },
    { id:"e61", title:"Закон индукции Фарадея", category:"Электродинамика", description:"ЭДС при изменении магнитного потока.", formula:"ε_i = -ΔΦ / Δt", unit:"В", inputs:[{id:"dPhi", label:"Изменение ΔΦ (Вб)", val:-0.2}, {id:"dt", label:"Интервал Δt (с)", val:0.05}] },
    { id:"e62", title:"ЭДС в движущемся проводнике", category:"Электродинамика", description:"ЭДС при пересечении силовых линий.", formula:"ε_i = B · v · l · sin(α)", unit:"В", inputs:[{id:"B", label:"Индукция B (Тл)", val:0.4}, {id:"v", label:"Скорость v (м/с)", val:12}, {id:"l", label:"Длина l (м)", val:0.5}, {id:"alpha", label:"Угол α (градусы)", val:90}] },
    { id:"e63", title:"ЭДС самоиндукции", category:"Электродинамика", description:"Реакция контура на пульсации тока.", formula:"ε_{си} = -L · ΔI / Δt", unit:"В", inputs:[{id:"L", label:"Индуктивность L (Гн)", val:0.1}, {id:"dI", label:"Сдвиг тока ΔI (А)", val:-0.5}, {id:"dt", label:"Интервал Δt (с)", val:0.01}] },
    { id:"e64", title:"Энергия магнитного поля (L, I)", category:"Электродинамика", description:"Запасаемая магнитная энергия катушки.", formula:"W = L · I² / 2", unit:"Дж", inputs:[{id:"L", label:"Индуктивность L (Гн)", val:0.5}, {id:"I", label:"Ток I (А)", val:4}] },
    { id:"e65", title:"Энергия магнитного поля (Φ, I)", category:"Электродинамика", description:"Энергия через поток и ток.", formula:"W = (Φ · I) / 2", unit:"Дж", inputs:[{id:"Phi", label:"Поток Φ (Вб)", val:0.1}, {id:"I", label:"Сила тока I (А)", val:2}] },
    { id:"e66", title:"Энергия магнитного поля (Φ, L)", category:"Электродинамика", description:"Энергия через поток и индуктивность.", formula:"W = Φ² / (2 · L)", unit:"Дж", inputs:[{id:"Phi", label:"Поток Φ (Вб)", val:0.1}, {id:"L", label:"Индуктивность L (Гн)", val:0.05}] },
    { id:"e67", title:"Закон Фарадея для электролиза", category:"Электродинамика", description:"Масса осадка на катоде.", formula:"m = k_э · I · t", unit:"кг", inputs:[{id:"kэ", label:"Коэффициент k_эл (кг/Кл)", val:3.29e-7}, {id:"I", label:"Ток I (А)", val:3}, {id:"t", label:"Время t (с)", val:1200}] },
    { id:"e68", title:"Магнитная проницаемость среды", category:"Электродинамика", description:"Отношение индукции в среде к вакууму.", formula:"μ = B / B_0", unit:"", inputs:[{id:"B", label:"Индукция среды B (Тл)", val:1.2}, {id:"B0", label:"Индукция в вакууме B₀ (Тл)", val:0.002}] },
    { id:"e69", title:"Формула Томсона (LC-контур)", category:"Электродинамика", description:"Период незатухающих колебаний.", formula:"T = 2 · π · √(L · C)", unit:"с", inputs:[{id:"L", label:"Индуктивность L (Гн)", val:0.01}, {id:"C", label:"Емкость C (Ф)", val:2.5e-6}] },
    { id:"e70", title:"Резонансная частота контура", category:"Электродинамика", description:"Собственная круговая частота LC-цепи.", formula:"ω = 1 / (√(L · C))", unit:"рад/с", inputs:[{id:"L", label:"Индуктивность L (Гн)", val:0.005}, {id:"C", label:"Емкость C (Ф)", val:4.7e-6}] },
    { id:"e71", title:"Действующая сила тока", category:"Электродинамика", description:"Эквивалент постоянного тока.", formula:"I_д = (I_m )/ (√2)", unit:"А", inputs:[{id:"Im", label:"Амплитуда I_m (А)", val:5}] },
    { id:"e72", title:"Действующее напряжение", category:"Электродинамика", description:"Эффективное напряжение синусоидальной сети.", formula:"U_д = (U_m) / (√2)", unit:"В", inputs:[{id:"Um", label:"Амплитуда U_m (В)", val:311}] },
    { id:"e73", title:"Мгновенная сила тока", category:"Электродинамика", description:"Ток гармонических колебаний.", formula:"i = I_m · sin(ω · t)", unit:"А", inputs:[{id:"Im", label:"Амплитуда I_m (А)", val:5}, {id:"w", label:"Частота ω (рад/с)", val:314}, {id:"t", label:"Время t (с)", val:0.005}] },
    { id:"e74", title:"Мгновенное напряжение", category:"Электродинамика", description:"Напряжение гармонических колебаний.", formula:"u = U_m · sin(ω · t)", unit:"В", inputs:[{id:"Um", label:"Амплитуда U_m (В)", val:220}, {id:"w", label:"Частота ω (рад/с)", val:314}, {id:"t", label:"Время t (с)", val:0.005}] },
    { id:"e75", title:"Мгновенная ЭДС", category:"Электродинамика", description:"ЭДС гармонических колебаний.", formula:"e = E_m · sin(ω · t)", unit:"В", inputs:[{id:"Em", label:"Амплитуда E_m (В)", val:36}, {id:"w", label:"Частота ω (рад/с)", val:314}, {id:"t", label:"Время t (с)", val:0.005}] },
    { id:"e76", title:"Мгновенный заряд", category:"Электродинамика", description:"Заряд гармонических колебаний.", formula:"q = q_m · sin(ω · t)", unit:"Кл", inputs:[{id:"qm", label:"Амплитуда q_m (Кл)", val:1e-5}, {id:"w", label:"Частота ω (рад/с)", val:314}, {id:"t", label:"Время t (с)", val:0.005}] },
    { id:"o1", title:"Закон преломления (через синусы)", category:"Оптика", description:"Относительный показатель преломления.", formula:"n = (sin(α))/(sin(β))", unit:"", inputs:[{id:"alpha", label:"Угол падения α (°)", val:45}, {id:"beta", label:"Угол преломления β (°)", val:30}] },
    { id:"o2", title:"Закон преломления (через скорости)", category:"Оптика", description:"Отношение скоростей света в двух средах.", formula:"n = v_1 / v_2", unit:"", inputs:[{id:"v1", label:"Скорость v₁ (м/с)", val:3e8}, {id:"v2", label:"Скорость v₂ (м/с)", val:2e8}] },
    { id:"o3", title:"Закон преломления (через абс. показатели)", category:"Оптика", description:"Отношение абсолютных показателей.", formula:"n = n_2 / n_1", unit:"", inputs:[{id:"n2", label:"Показатель n₂", val:1.5}, {id:"n1", label:"Показатель n₁", val:1}] },
    { id:"o4", title:"Предельный угол полного отражения", category:"Оптика", description:"Синус предельного угла полного внутреннего отражения.", formula:"sin_α0 = n_2 / n_1", unit:"", inputs:[{id:"n1", label:"Плотная среда n₁", val:1.5}, {id:"n2", label:"Разреженная среда n₂", val:1}] },
    { id:"o5", title:"Формула тонкой линзы", category:"Оптика", description:"Оптическая сила тонкой линзы через расстояния до предмета и изображения.", formula:"D = 1 / d + 1 / f", unit:"дптр", inputs:[{id:"d", label:"Расстояние до предмета d (м)", val:0.3}, {id:"f", label:"Расстояние до изображения f (м)", val:0.6}] },
    { id:"o6", title:"Линейное увеличение линзы", category:"Оптика", description:"Масштабный коэффициент.", formula:"Γ = f / d", unit:"крат", inputs:[{id:"f", label:"Дистанция f (м)", val:0.8}, {id:"d", label:"Дистанция d (м)", val:0.2}] },
    { id:"o7", title:"Абсолютный показатель преломления", category:"Оптика", description:"Отношение скорости света в вакууме к скорости в среде.", formula:"n = c / v", unit:"", inputs:[{id:"v", label:"Скорость v (м/с)", val:2e8}] },
    { id:"o8", title:"Показатель преломления (через среду)", category:"Оптика", description:"Через диэлектрическую и магнитную проницаемости.", formula:"n = √(ε · μ)", unit:"", inputs:[{id:"eps", label:"Диэл. проницаемость ε", val:2.25}, {id:"mu", label:"Магн. проницаемость μ", val:1}] },
    { id:"o9", title:"Формула дифракционной решетки", category:"Оптика", description:"Положение угловых максимумов.", formula:"λ = d · sin(φ) / k", unit:"м", inputs:[{id:"d", label:"Шаг решетки d (м)", val:4e-6}, {id:"phi", label:"Угол φ (градусы)", val:30}, {id:"k", label:"Порядок k", val:2}] },
    { id:"o10", title:"Условие интерференционного максимума", category:"Оптика", description:"Разность хода для максимума.", formula:"Δd = k · λ", unit:"м", inputs:[{id:"k", label:"Порядок k", val:1}, {id:"lambda", label:"Длина волны λ (м)", val:5e-7}] },
    { id:"o11", title:"Условие интерференционного минимума", category:"Оптика", description:"Разность хода для минимума.", formula:"Δd = (2 · k + 1) · (λ) / 2", unit:"м", inputs:[{id:"k", label:"Порядок k", val:0}, {id:"lambda", label:"Длина волны λ (м)", val:5e-7}] },
    { id:"o12", title:"Ширина интерференционной полосы", category:"Оптика", description:"Ширина полосы в опыте Юнга.", formula:"Δx = λ · l / d", unit:"м", inputs:[{id:"lambda", label:"Длина волны λ (м)", val:5e-7}, {id:"l", label:"До экрана l (м)", val:1}, {id:"d", label:"Между источниками d (м)", val:0.001}] },
    { id:"o13", title:"Условие максимума (тонкая пленка)", category:"Оптика", description:"Отражение от пленки.", formula:"λ = 2 · d · n / k", unit:"м", inputs:[{id:"d", label:"Толщина d (м)", val:1e-6}, {id:"n", label:"Показатель n", val:1.5}, {id:"k", label:"Порядок k", val:1}] },
    { id:"o14", title:"Условие минимума (тонкая пленка)", category:"Оптика", description:"Отражение от пленки.", formula:"λ = 4 · d · n / (2 · k + 1)", unit:"м", inputs:[{id:"d", label:"Толщина d (м)", val:1e-6}, {id:"n", label:"Показатель n", val:1.5}, {id:"k", label:"Порядок k", val:0}] },
    { id:"o15", title:"Оптическая сила линзы", category:"Оптика", description:"Преломляющая способность линзы.", formula:"D = 1 / F", unit:"дптр", inputs:[{id:"F", label:"Фокусное расстояние F (м)", val:0.25}] },
    { id:"q1", title:"Масса фотона", category:"Квантовая физика", description:"Эквивалент массы.", formula:"m = (h_p · ν) / c²", unit:"кг", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"nu", label:"Частота ν (Гц)", val:5e14}] },
    { id:"q2", title:"Давление света", category:"Квантовая физика", description:"Воздействие фотонного потока.", formula:"P = I / c · (1 + ρ)", unit:"Па", inputs:[{id:"I", label:"Интенсивность I (Вт/м²)", val:1360}, {id:"rho", label:"Отражение ρ (0..1)", val:1}] },
    { id:"q3", title:"Импульс фотона (через энергию)", category:"Квантовая физика", description:"Механический импульс.", formula:"p = E / c", unit:"кг·м/с", inputs:[{id:"E", label:"Энергия E (Дж)", val:3.3e-19}] },
    { id:"q4", title:"Импульс фотона (через частоту)", category:"Квантовая физика", description:"Импульс светового кванта.", formula:"p = (h_p · ν) / c", unit:"кг·м/с", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"nu", label:"Частота ν (Гц)", val:5e14}] },
    { id:"q5", title:"Импульс фотона (через длину волны)", category:"Квантовая физика", description:"Импульс через длину.", formula:"p = (h_p) / (λ)", unit:"кг·м/с", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"lambda", label:"Длина волны λ (м)", val:6e-7}] },
    { id:"q6", title:"Энергия покоя (Эйнштейн)", category:"Квантовая физика", description:"Полная энергия.", formula:"E = m · c²", unit:"Дж", inputs:[{id:"m", label:"Масса m (кг)", val:1}] },
    { id:"q7", title:"Энергия фотона (циклическая частота)", category:"Квантовая физика", description:"Энергия через угловую частоту.", formula:"E = h · ω", unit:"Дж", inputs:[{id:"w", label:"Цикл. частота ω (рад/с)", val:3e15}] },
    { id:"q8", title:"Энергия фотона (через импульс)", category:"Квантовая физика", description:"Связь энергии с движением.", formula:"E = p · c", unit:"Дж", inputs:[{id:"p", label:"Импульс p (кг·м/с)", val:1e-27}] },
    { id:"q9", title:"Энергия фотона (через частоту)", category:"Квантовая физика", description:"Квант энергии.", formula:"E = h_p · ν", unit:"Дж", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"nu", label:"Частота ν (Гц)", val:5e14}] },
    { id:"q10", title:"Энергия фотона (через длину волны)", category:"Квантовая физика", description:"Порция энергии.", formula:"E = (h · c) / λ", unit:"Дж", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"lambda", label:"Длина волны λ (м)", val:6e-7}] },
    { id:"q11", title:"Работа выхода (через частоту)", category:"Квантовая физика", description:"Энергия для удаления электрона.", formula:"A_{вых} = h_p · ν_min", unit:"Дж", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"nu_min", label:"Мин. частота ν_min (Гц)", val:5e14}] },
    { id:"q12", title:"Работа выхода (через длину волны)", category:"Квантовая физика", description:"Энергия через порог.", formula:"A_{вых} = (h_p · c) / λ_max", unit:"Дж", inputs:[{id:"hp", label:"Постоянная Планка h", val:6.626e-34}, {id:"lambda_max", label:"Макс. длина λ_max (м)", val:6e-7}] },
    { id:"q13", title:"Уравнение фотоэффекта Эйнштейна", category:"Квантовая физика", description:"Максимальная кинетическая энергия фотоэлектронов.", formula:"E_кmax = h_p · ν - A_в", unit:"Дж", inputs:[{id:"hp", label:"Постоянная Планка h (Дж·с)", val:6.626e-34}, {id:"nu", label:"Частота света ν (Гц)", val:8e14}, {id:"Aв", label:"Работа выхода A_в (Дж)", val:3.5e-19}] },
    { id:"q14", title:"Красная граница фотоэффекта", category:"Квантовая физика", description:"Предельная длина волны для возникновения фотоэффекта.", formula:"λ_кр = (h_p · c) / A_в", unit:"м", inputs:[{id:"hp", label:"Постоянная Планка h (Дж·с)", val:6.626e-34}, {id:"c", label:"Скорость света c (м/с)", val:299792458}, {id:"Aв", label:"Работа выхода A_в (Дж)", val:7.2e-19}] },
    { id:"q15", title:"Постулат Бора (Квантование орбит)", category:"Квантовая физика", description:"Момент импульса электрона.", formula:"L = n · h_b", unit:"кг·м²/с", inputs:[{id:"n", label:"Орбита n", val:2}] },
    { id:"q16", title:"Формула Бальмера (Спектр)", category:"Квантовая физика", description:"Длина волны излучения атома водорода в серии Бальмера.", formula:"λ = 1 / (R_r · (1/4 - 1/n²))", unit:"м", inputs:[{id:"Rr", label:"Постоянная Ридберга R (м⁻¹)", val:10973731.57}, {id:"n", label:"Энергетический уровень n (>2)", val:3}] },
    { id:"q17", title:"Энергия связи ядра", category:"Квантовая физика", description:"Энергия удержания нуклонов через дефект масс.", formula:"E_{св} = Δm · c²", unit:"Дж", inputs:[{id:"dm", label:"Дефект масс Δm (кг)", val:5.04e-29}, {id:"c", label:"Скорость света c (м/с)", val:299792458}] },
    { id:"q18", title:"Закон радиоактивного распада", category:"Квантовая физика", description:"Число нераспавшихся ядер к моменту времени t.", formula:"N = N_0 · 2^(-t / T)", unit:"", inputs:[{id:"N0", label:"Нач. число ядер N₀", val:1e6}, {id:"t", label:"Время t (сут)", val:24}, {id:"T", label:"Период полураспада T (сут)", val:8}] },
    { id:"q19", title:"Квантование орбит Бора", category:"Квантовая физика", description:"Радиус стационарной орбиты через момент импульса электрона.", formula:"r_n = (n · h_b) / (m_e · v_n)", unit:"м", inputs:[{id:"n", label:"Номер орбиты n", val:1}, {id:"hb", label:"Постоянная Дирака ℏ (Дж·с)", val:1.05457e-34}, {id:"me", label:"Масса электрона m_e (кг)", val:9.11e-31}, {id:"vn", label:"Скорость электрона v_n (м/с)", val:2.19e6}] },
    { id:"q20", title:"Радиус орбиты Бора", category:"Квантовая физика", description:"Физический размер орбиты.", formula:"r_n = (n² · h_b²) / (m_e · k · e²)", unit:"м", inputs:[{id:"n", label:"Орбита n", val:1}, {id:"m_e", label:"Масса m_e (кг)", val:9.11e-31}, {id:"k", label:"Коэффициент k", val:8.988e9}] },
    { id:"q21", title:"Скорость электрона на орбите", category:"Квантовая физика", description:"Орбитальная скорость.", formula:"v_n = (k · e²) / (n · h_b)", unit:"м/с", inputs:[{id:"k", label:"Коэффициент k", val:8.988e9}, {id:"n", label:"Орбита n", val:1}] },
    { id:"q22", title:"Энергия стационарного состояния", category:"Квантовая физика", description:"Полная энергия.", formula:"E_n = -(m_e · k² · e⁴) / (2 · n² · h_b²)", unit:"Дж", inputs:[{id:"m_e", label:"Масса m_e (кг)", val:9.11e-31}, {id:"k", label:"Коэффициент k", val:8.988e9}, {id:"n", label:"Орбита n", val:1}] },
    { id:"q23", title:"Радиус первой боровской орбиты", category:"Квантовая физика", description:"Масштаб длины.", formula:"r_1 = h_b² / (m_e · k · e²)", unit:"м", inputs:[{id:"m_e", label:"Масса m_e (кг)", val:9.11e-31}, {id:"k", label:"Коэффициент k", val:8.988e9}] },
    { id:"q24", title:"Энергия основного состояния", category:"Квантовая физика", description:"Энергия связи электрона.", formula:"E_1 = -(m_e · k² · e⁴) / (2 · h_b²)", unit:"Дж", inputs:[{id:"m_e", label:"Масса m_e (кг)", val:9.11e-31}, {id:"k", label:"Коэффициент k", val:8.988e9}] },
    { id:"q25", title:"Поглощенная доза излучения", category:"Квантовая физика", description:"Переданная энергия.", formula:"D = E / m", unit:"Гр", inputs:[{id:"E", label:"Энергия E (Дж)", val:1e-3}, {id:"m", label:"Масса m (кг)", val:70}] },
    { id:"q26", title:"Экспозиционная доза излучения", category:"Квантовая физика", description:"Ионизирующее действие.", formula:"X = q / m", unit:"Кл/кг", inputs:[{id:"q", label:"Заряд q (Кл)", val:2.58e-4}, {id:"m", label:"Масса m (кг)", val:1}] },
    { id:"q27", title:"Эквивалентная доза излучения", category:"Квантовая физика", description:"Доза с учетом биологии.", formula:"H = D · W_R", unit:"Зв", inputs:[{id:"D", label:"Погл. доза D (Гр)", val:0.05}, {id:"WR", label:"Коэффициент W_R", val:20}] },
    { id:"q28", title:"Мощность дозы излучения", category:"Квантовая физика", description:"Скорость накопления радиации.", formula:"P = D / t", unit:"Гр/с", inputs:[{id:"D", label:"Доза D (Гр)", val:0.1}, {id:"t", label:"Время t (с)", val:3600}] },
    { id:"q29", title:"Дефект массы ядра", category:"Квантовая физика", description:"Разность масс нуклонов и ядра.", formula:"Δm = Z · m_p + (A - Z) · m_n - M_я", unit:"а.е.м.", inputs:[{id:"Z", label:"Протоны Z", val:2}, {id:"mp", label:"Масса протона m_p", val:1.007276}, {id:"A", label:"Нуклоны A", val:4}, {id:"mn", label:"Масса нейтрона m_n", val:1.008665}, {id:"Mя", label:"Масса ядра M_я", val:4.001506}] },
    { id:"s1", title:"Релятивистская масса", category:"СТО", description:"Увеличение массы при движении.", formula:"m = (m_0) / (√(1 - v² / c²))", unit:"кг", inputs:[{id:"m0", label:"Масса покоя m₀ (кг)", val:1}, {id:"v", label:"Скорость v (м/с)", val:2.4e8}] },
    { id:"s2", title:"Относительность расстояний", category:"СТО", description:"Сокращение линейного размера.", formula:"l = l_0 · √(1 - v² / c²)", unit:"м", inputs:[{id:"l0", label:"Собств. длина l₀ (м)", val:10}, {id:"v", label:"Скорость v (м/с)", val:2.4e8}] },
    { id:"s3", title:"Относительность промежутков времени", category:"СТО", description:"Замедление времени.", formula:"τ = τ_0 / (√(1 - v² / c²))", unit:"с", inputs:[{id:"tau0", label:"Собств. время τ₀ (с)", val:1}, {id:"v", label:"Скорость v (м/с)", val:2.4e8}] },
    { id:"s4", title:"Сложение скоростей", category:"СТО", description:"Релятивистское сложение скоростей.", formula:"v_{res} = (v_1 + v) / (1 + v_1·v /c² )", unit:"м/с", inputs:[{id:"v1", label:"Скорость тела v₁ (м/с)", val:2e8}, {id:"v", label:"Скорость системы v (м/с)", val:1.5e8}] },
    { id:"s5", title:"Релятивистская кинетическая энергия", category:"СТО", description:"Разность полной энергии и покоя.", formula:"E_kin = m_0 · c² · (1 / (√(1 - v² / c²)) - 1)", unit:"Дж", inputs:[{id:"m0", label:"Масса покоя m₀ (кг)", val:1}, {id:"v", label:"Скорость v (м/с)", val:2.4e8}] },
    { id:"s6", title:"Связь импульса и энергии", category:"СТО", description:"Инвариантное соотношение.", formula:"E = √(p² · c² + m_0² · c⁴)", unit:"Дж", inputs:[{id:"p", label:"Импульс p (кг·м/с)", val:2e-19}, {id:"m0", label:"Масса покоя m₀ (кг)", val:9.11e-31}] }
];

const state = { variables: {} };
let rawCalculatedValue = null;
let activeFormula = null;
let targetUnit = '';

const targetVarInput = document.getElementById('targetVar');
const formulaInput = document.getElementById('formulaInput');
const activeFormulaBadge = document.getElementById('activeFormulaBadge');
const decimalWarning = document.getElementById('decimalWarning');
const variablesContainer = document.getElementById('variablesContainer');
const mathPreviewWrapper = document.getElementById('mathPreviewWrapper');
const mathPreview = document.getElementById('mathPreview');
const solutionSteps = document.getElementById('solutionSteps');
const finalResult = document.getElementById('finalResult');
const resultUnitEl = document.getElementById('resultUnit');
const resultBox = document.getElementById('resultBox');
const resultLabel = document.getElementById('resultLabel');
const targetVarBadge = document.getElementById('targetVarBadge');
const precisionSelect = document.getElementById('precisionSelect');
const varsCount = document.getElementById('varsCount');
const themeToggle = document.getElementById('themeToggle');
const helpModal = document.getElementById('helpModal');
const catalogModal = document.getElementById('catalogModal');
const solutionModal = document.getElementById('solutionModal');
const solutionModalBody = document.getElementById('solutionModalBody');
const solutionModalSubtitle = document.getElementById('solutionModalSubtitle');
const historyModal = document.getElementById('historyModal');
const historyModalBody = document.getElementById('historyModalBody');
const historyCountBadge = document.getElementById('historyCountBadge');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const saveToHistoryBtn = document.getElementById('saveToHistoryBtn');

const HISTORY_STORAGE_KEY = 'physcalc_history';
const MAX_HISTORY_ITEMS = 50;
let historyAutoSaveTimer = null;

function getHistoryList() {
    try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
    return [];
    }
}

function saveHistoryList(list) {
    try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(list.slice(0, MAX_HISTORY_ITEMS)));
    } catch (e) {}
    updateHistoryBadge();
}

function updateHistoryBadge() {
    if (!historyCountBadge) return;
    const count = getHistoryList().length;
    if (count > 0) {
    historyCountBadge.textContent = count > 99 ? '99+' : String(count);
    historyCountBadge.classList.remove('hidden');
    } else {
    historyCountBadge.classList.add('hidden');
    }
    if (clearHistoryBtn) {
    clearHistoryBtn.classList.toggle('hidden', count === 0);
    }
}

function buildHistorySignature(target, formula, varsObj) {
    const keys = Object.keys(varsObj || {}).sort();
    const varsPart = keys.map(k => `${k}:${varsObj[k]}`).join(',');
    return `${target}|${normalizeFormula(formula).replace(/\s+/g, '')}|${varsPart}`;
}

function saveCurrentCalculationToHistory(forceMoveToTop = false) {
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    const displayFormula = formulaInput.value.trim();
    const rawFormula = normalizeFormula(displayFormula);
    if (!rawFormula) return false;
    if (rawCalculatedValue === null || typeof rawCalculatedValue !== 'number' || !isFinite(rawCalculatedValue) || isNaN(rawCalculatedValue)) {
    return false;
    }

    const sig = buildHistorySignature(target, displayFormula, state.variables);
    let list = getHistoryList();

    if (list.length > 0 && list[0].sig === sig) {
    if (forceMoveToTop) {
        list[0].timestamp = Date.now();
        list[0].result = finalResult.textContent || formatNumber(rawCalculatedValue);
        saveHistoryList(list);
    }
    return true;
    }

    list = list.filter(item => item.sig !== sig);

    const entry = {
    id: 'h_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    sig,
    timestamp: Date.now(),
    formulaId: activeFormula ? activeFormula.id : null,
    title: activeFormula ? activeFormula.title : 'Своя формула',
    category: activeFormula ? activeFormula.category : 'Пользовательская',
    target: targetVarInput.value.trim() || 'v',
    formula: displayFormula,
    variables: { ...state.variables },
    result: (finalResult && finalResult.textContent && finalResult.textContent !== '—' && finalResult.textContent !== 'Ошибка')
        ? finalResult.textContent
        : formatNumber(rawCalculatedValue),
    rawResult: rawCalculatedValue,
    unit: targetUnit || ''
    };

    list.unshift(entry);
    if (list.length > MAX_HISTORY_ITEMS) list = list.slice(0, MAX_HISTORY_ITEMS);
    saveHistoryList(list);
    if (historyModal && !historyModal.classList.contains('hidden')) {
    renderHistoryModal();
    }
    return true;
}

function scheduleHistorySave() {
    clearTimeout(historyAutoSaveTimer);
    historyAutoSaveTimer = setTimeout(() => {
    saveCurrentCalculationToHistory(false);
    }, 1200);
}

function formatHistoryTimestamp(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    const timeStr = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Сегодня, ${timeStr}`;
    if (isYesterday) return `Вчера, ${timeStr}`;
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }) + `, ${timeStr}`;
}

function renderHistoryModal() {
    if (!historyModalBody) return;
    const list = getHistoryList();
    updateHistoryBadge();

    if (list.length === 0) {
    historyModalBody.innerHTML = `
        <div class="flex flex-col items-center justify-center py-14 px-4 text-center">
        <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3 shadow-inner">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 mb-1">История вычислений пока пуста</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            Измените значения переменных, введите свою формулу или нажмите кнопку «В историю», чтобы сохранить расчёт.
        </p>
        </div>`;
    return;
    }

    historyModalBody.innerHTML = list.map(item => {
    const targetNorm = normalizeFormula(item.target || 'y') || 'y';
    const formulaNorm = normalizeFormula(item.formula || '');
    const eqLatex = `${formatIdentifierToLaTeX(targetNorm)} = ${convertToLaTeX(formulaNorm)}`;
    const targetLatex = formatIdentifierToLaTeX(targetNorm);
    const varsEntries = Object.entries(item.variables || {});
    const varsPills = varsEntries.length > 0
        ? varsEntries.map(([k, v]) => {
            const vLatex = formatIdentifierToLaTeX(k);
            return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono border border-slate-200/70 dark:border-slate-700/70"><span class="hist-math-inline" data-latex="${escapeHtmlAttr(vLatex)}">${escapeHtmlAttr(k)}</span> = <b>${escapeHtmlAttr(String(v))}</b></span>`;
        }).join('')
        : `<span class="text-[11px] text-slate-400">Константное выражение</span>`;

    return `
        <div class="group bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow-md cursor-pointer" onclick="restoreHistoryItem('${item.id}')">
        <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
            <span class="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/70 px-2 py-0.5 rounded-md border border-brand-200/50 dark:border-brand-800/50 shrink-0">${escapeHtmlAttr(item.category || 'Расчёт')}</span>
            <h4 class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">${escapeHtmlAttr(item.title || 'Формула')}</h4>
            </div>
            <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
            <span class="text-[11px] text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline">${formatHistoryTimestamp(item.timestamp)}</span>
            <button type="button" onclick="copyHistoryItem('${item.id}', this)" title="Скопировать ответ" class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors touch-btn">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            </button>
            <button type="button" onclick="deleteHistoryItem('${item.id}')" title="Удалить запись" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors touch-btn">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-950/70 rounded-xl p-2.5 sm:p-3 border border-slate-100 dark:border-slate-800/80 mb-2.5">
            <div class="overflow-x-auto custom-scrollbar py-0.5">
            <span class="hist-math-inline text-sm sm:text-base" data-latex="${escapeHtmlAttr(eqLatex)}">${escapeHtmlAttr(item.target)} = ${escapeHtmlAttr(item.formula)}</span>
            </div>
            <div class="flex items-baseline gap-1.5 shrink-0 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span class="hist-math-inline text-xs font-bold text-emerald-700 dark:text-emerald-300" data-latex="${escapeHtmlAttr(targetLatex + ' =')}">${escapeHtmlAttr(item.target)} =</span>
            <span class="font-mono font-extrabold text-sm sm:text-base text-emerald-900 dark:text-emerald-100">${escapeHtmlAttr(String(item.result))}</span>
            ${item.unit ? `<span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">${escapeHtmlAttr(item.unit)}</span>` : ''}
            </div>
        </div>

        <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex flex-wrap gap-1.5">${varsPills}</div>
            <span class="text-[10px] text-slate-400 dark:text-slate-500 sm:hidden ml-auto">${formatHistoryTimestamp(item.timestamp)}</span>
        </div>
        </div>`;
    }).join('');

    if (window.katex) {
    historyModalBody.querySelectorAll('.hist-math-inline').forEach(el => {
        try {
        katex.render(el.dataset.latex, el, { displayMode: false, throwOnError: false });
        } catch (e) {}
    });
    }
}

window.restoreHistoryItem = function(id) {
    const list = getHistoryList();
    const item = list.find(x => x.id === id);
    if (!item) return;

    clearTimeout(historyAutoSaveTimer);
    if (item.formulaId) {
    activeFormula = physicsFormulas.find(f => f.id === item.formulaId) || null;
    } else {
    activeFormula = null;
    }

    targetVarInput.value = item.target || 'v';
    formulaInput.value = item.formula || '';
    targetUnit = item.unit || '';
    state.variables = { ...(item.variables || {}) };

    toggleModal(historyModal, false);
    onFormulaChange();
};

window.deleteHistoryItem = function(id) {
    const list = getHistoryList().filter(x => x.id !== id);
    saveHistoryList(list);
    renderHistoryModal();
};

window.copyHistoryItem = function(id, btnEl) {
    const list = getHistoryList();
    const item = list.find(x => x.id === id);
    if (!item) return;
    const target = normalizeFormula(item.target || 'y') || 'y';
    const copyText = `${target} = ${item.result} ${item.unit || ''}`.trim();
    const doFeedback = () => {
    if (!btnEl) return;
    const orig = btnEl.innerHTML;
    btnEl.innerHTML = `<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
    setTimeout(() => { btnEl.innerHTML = orig; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(copyText).then(doFeedback).catch(() => {});
    } else {
    try {
        const ta = document.createElement('textarea');
        ta.value = copyText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        doFeedback();
    } catch (e) {}
    }
};

function debounce(func, delay = 100) {
    let timer = null;
    return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
    };
}

themeToggle.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
    } else {
    htmlEl.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
    }
}, { passive: true });

const toggleModal = (modal, show) => {
    if (show) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    } else {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    }
};

const closeCatalog = () => {
    toggleModal(catalogModal, false);
    localStorage.removeItem('catalogOpen');
};

document.getElementById('openHelpBtn').addEventListener('click', () => toggleModal(helpModal, true), { passive: true });
document.getElementById('closeHelpBtn').addEventListener('click', () => toggleModal(helpModal, false), { passive: true });
document.getElementById('modalOkBtn').addEventListener('click', () => toggleModal(helpModal, false), { passive: true });

document.getElementById('openCatalogBtn').addEventListener('click', () => {
    toggleModal(catalogModal, true);
    localStorage.setItem('catalogOpen', 'true');
    renderCatalog();
}, { passive: true });

document.getElementById('closeCatalogBtn').addEventListener('click', closeCatalog, { passive: true });
document.getElementById('closeCatalogBtnDesktop').addEventListener('click', closeCatalog, { passive: true });

document.getElementById('openHistoryBtn').addEventListener('click', () => {
    renderHistoryModal();
    toggleModal(historyModal, true);
}, { passive: true });

document.getElementById('closeHistoryBtn').addEventListener('click', () => toggleModal(historyModal, false), { passive: true });
document.getElementById('historyModalCloseBtn').addEventListener('click', () => toggleModal(historyModal, false), { passive: true });

clearHistoryBtn.addEventListener('click', () => {
    saveHistoryList([]);
    renderHistoryModal();
}, { passive: true });

saveToHistoryBtn.addEventListener('click', () => {
    clearTimeout(historyAutoSaveTimer);
    const saved = saveCurrentCalculationToHistory(true);
    if (saved) {
    const origHtml = saveToHistoryBtn.innerHTML;
    saveToHistoryBtn.innerHTML = `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg><span>Сохранено!</span>`;
    setTimeout(() => { saveToHistoryBtn.innerHTML = origHtml; }, 1400);
    }
}, { passive: true });

helpModal.addEventListener('click', (e) => { if (e.target === helpModal) toggleModal(helpModal, false); }, { passive: true });
catalogModal.addEventListener('click', (e) => { if (e.target === catalogModal) closeCatalog(); }, { passive: true });
solutionModal.addEventListener('click', (e) => { if (e.target === solutionModal) toggleModal(solutionModal, false); }, { passive: true });
historyModal.addEventListener('click', (e) => { if (e.target === historyModal) toggleModal(historyModal, false); }, { passive: true });

function openSolutionModal() {
    solutionModalBody.innerHTML = solutionSteps.innerHTML || '<div class="text-slate-400 text-sm">Введите формулу для расчёта</div>';
    solutionModalBody.querySelectorAll('.math-inline').forEach(el => el.removeAttribute('data-rendered'));
    const target = targetVarInput.value.trim() || 'y';
    const formula = formulaInput.value.trim() || '';
    solutionModalSubtitle.textContent = formula ? `${target} = ${formula}` : 'Подробный расчёт по шагам';
    renderMathInSolution(solutionModalBody);
    toggleModal(solutionModal, true);
}

document.getElementById('expandSolutionBtn').addEventListener('click', openSolutionModal, { passive: true });
document.getElementById('closeSolutionBtn').addEventListener('click', () => toggleModal(solutionModal, false), { passive: true });
document.getElementById('solutionModalCloseBtn').addEventListener('click', () => toggleModal(solutionModal, false), { passive: true });

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    toggleModal(helpModal, false);
    closeCatalog();
    toggleModal(solutionModal, false);
    toggleModal(historyModal, false);
    }
});

document.getElementById('clearFormulaBtn').addEventListener('click', () => {
    formulaInput.value = '';
    activeFormula = null;
    targetUnit = '';
    onFormulaChange();
    formulaInput.focus();
}, { passive: true });

(function initQuickKeys() {
    const panel = document.getElementById('quickKeys');
    if (!panel) return;
    panel.querySelectorAll('.quick-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        panel.querySelectorAll('.quick-tab').forEach(t => t.classList.toggle('active', t === tab));
        const target = tab.dataset.quickTab;
        panel.querySelectorAll('.quick-group').forEach(g => {
        const show = g.dataset.quickGroup === target;
        g.classList.toggle('hidden', !show);
        g.classList.toggle('grid', show);
        });
    }, { passive: true });
    });
    function insertAtCursor(text, cursorMode) {
    const input = formulaInput;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const before = input.value.slice(0, start);
    const after = input.value.slice(end);
    let cursorPos = start + text.length;
    if (cursorMode === 'inside') {
        const idx = text.indexOf('(');
        cursorPos = idx !== -1 ? start + idx + 1 : start + Math.floor(text.length / 2);
    } else if (cursorMode === 'first') {
        const idx = text.indexOf(',');
        cursorPos = idx !== -1 ? start + idx : start + text.length;
    }
    input.value = before + text + after;
    input.focus();
    try { input.setSelectionRange(cursorPos, cursorPos); } catch(e) {}
    input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    panel.querySelectorAll('.qk').forEach(btn => {
    btn.addEventListener('click', () => {
        insertAtCursor(btn.dataset.insert || '', btn.dataset.cursor || null);
    }, { passive: true });
    });
})();

precisionSelect.addEventListener('change', updateResultDisplay, { passive: true });
const debouncedOnFormulaChange = debounce(() => {
    onFormulaChange();
    scheduleHistorySave();
}, 100);
targetVarInput.addEventListener('input', debouncedOnFormulaChange);
formulaInput.addEventListener('input', debouncedOnFormulaChange);

const GREEK_LATEX = {
    'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta',
    'φ': '\\varphi', 'λ': '\\lambda', 'ν': '\\nu', 'ρ': '\\rho',
    'ε': '\\varepsilon', 'μ': '\\mu', 'ω': '\\omega', 'π': '\\pi',
    'τ': '\\tau', 'Φ': '\\Phi', 'Γ': '\\Gamma', 'Δ': '\\Delta',
    'ℏ': '\\hbar', 'η': '\\eta',
    'alpha': '\\alpha', 'beta': '\\beta', 'gamma': '\\gamma', 'delta': '\\delta',
    'phi': '\\varphi', 'lambda': '\\lambda', 'nu': '\\nu', 'rho': '\\rho',
    'eps': '\\varepsilon', 'mu': '\\mu', 'omega': '\\omega', 'pi': '\\pi',
    'tau': '\\tau', 'Phi': '\\Phi', 'Gamma': '\\Gamma', 'eta': '\\eta',
    'hbar': '\\hbar', 'h_bar': '\\hbar'
};

const KNOWN_COMPOUND_VARS = {
    'hmax': ['h', 'max'], 'vmax': ['v', 'max'], 'amax': ['a', 'max'],
    'numin': ['\\nu', 'min'], 'lambdamax': ['\\lambda', 'max'],
    'lambdaкр': ['\\lambda', 'кр'], 'Eкmax': ['E', 'к,max'],
    'vкв': ['v', 'кв'], 'vгал': ['v', 'гал'], 'Fтр': ['F', 'тр'],
    'Fупр': ['F', 'упр'], 'Aст': ['A', 'ст'], 'Aвых': ['A', 'вых'],
    'Aв': ['A', 'в'], 'Agas': ['A', 'gas'], 'Aext': ['A', 'ext'],
    'Eк': ['E', 'к'], 'Ek': ['E', 'к'], 'Ep': ['E', 'p'],
    'Eсв': ['E', 'св'], 'Ekin': ['E', 'kin'], 'vres': ['v', 'res'],
    'm0C': ['m', '0\\text{C}'], 'NA': ['N', 'A'], 'Mr': ['M', 'r'],
    'Vm': ['V', 'm'], 'WR': ['W', 'R'], 'Mя': ['M', 'я'],
    'mp': ['m', 'p'], 'mn': ['m', 'n'], 'me': ['m', 'e'],
    'vn': ['v', 'n'], 'rn': ['r', 'n'], 'En': ['E', 'n'],
    'kэл': ['k', 'эл'], 'kэ': ['k', 'э'],
    'Im': ['I', 'm'], 'Um': ['U', 'm'], 'Em': ['E', 'm'], 'qm': ['q', 'm'],
    'Iд': ['I', 'д'], 'Uд': ['U', 'д'], 'aц': ['a', 'ц'],
    'gh': ['g', 'h'], 'vz': ['v', 'z'], 'FL': ['F', 'L'], 'FA': ['F', 'A'],
    'Wc': ['W', 'c'], 'Wp': ['W', 'p'], 'Cобщ': ['C', 'общ'],
    'Rобщ': ['R', 'общ'], 'Iкз': ['I', 'кз'], 'Pполн': ['P', 'полн'],
    'etamax': ['\\eta', 'max'], 'ηmax': ['\\eta', 'max'],
    'εi': ['\\varepsilon', 'i'], 'epsi': ['\\varepsilon', 'i'],
    'εси': ['\\varepsilon', 'си'], 'sinα0': ['\\sin\\alpha', '0']
};

const DELTA_VARS = {
    'dPhi': '\\Delta \\Phi', 'dV': '\\Delta V', 'dT': '\\Delta T',
    'dI': '\\Delta I', 'dt': '\\Delta t', 'dr': '\\Delta r',
    'dx': '\\Delta x', 'dm': '\\Delta m', 'dd': '\\Delta d',
    'dU': '\\Delta U', 'dphi': '\\Delta \\varphi'
};

function formatSubscript(sub) {
    if (!sub) return '';
    sub = sub.replace(/^\{|\}$/g, '');
    if (GREEK_LATEX[sub]) return `_{${GREEK_LATEX[sub]}}`;
    if (/^[0-9]+$/.test(sub) || /^[a-zA-Z]$/.test(sub)) {
    return sub.length === 1 ? `_${sub}` : `_{${sub}}`;
    }
    if (sub === 'max' || sub === 'min') return `_{\\${sub}}`;
    if (/[а-яА-ЯёЁ]/.test(sub)) return `_{\\text{${sub}}}`;
    return `_{${sub}}`;
}

function formatIdentifierToLaTeX(ident) {
    if (!ident) return '';
    if (GREEK_LATEX[ident]) return GREEK_LATEX[ident];
    if (ident === 'hb' || ident === 'hbar' || ident === 'h_b' || ident === 'h_bar') return '\\hbar';
    if (ident === 'hp' || ident === 'hpl' || ident === 'h_p') return 'h';
    if (ident === 'mu0' || ident === 'μ_0' || ident === 'μ0') return '\\mu_0';
    if (ident === 'eps0' || ident === 'ε_0' || ident === 'ε0') return '\\varepsilon_0';
    if (ident === 'c_light') return 'c';
    if (ident === 'e_charge') return 'e';
    if (ident === 'R_ryd' || ident === 'Rr' || ident === 'R_r') return 'R';

    if (ident.startsWith('Δ') && ident.length > 1) {
    return '\\Delta ' + formatIdentifierToLaTeX(ident.slice(1));
    }
    if (DELTA_VARS[ident]) return DELTA_VARS[ident];
    if (KNOWN_COMPOUND_VARS[ident]) {
    const [b, s] = KNOWN_COMPOUND_VARS[ident];
    return b + formatSubscript(s);
    }

    const uIdx = ident.indexOf('_');
    if (uIdx !== -1) {
    const base = ident.slice(0, uIdx);
    const sub = ident.slice(uIdx + 1);
    const baseLatex = GREEK_LATEX[base] || (base === 'sin' ? '\\sin ' : base);
    return baseLatex + formatSubscript(sub);
    }

    const greekDigitMatch = ident.match(/^([a-zA-Zа-яА-ЯёЁα-ωΑ-Ω]+?)([0-9]+)$/);
    if (greekDigitMatch) {
    const [, base, digits] = greekDigitMatch;
    const baseLatex = GREEK_LATEX[base] || base;
    return baseLatex + formatSubscript(digits);
    }

    return ident;
}

function preprocessMathString(str) {
    return String(str)
    .replace(/·/g, '*')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/–/g, '-')
    .replace(/;/g, ',')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/⁻¹/g, '^(-1)')
    .replace(/₀/g, '_0')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/₄/g, '_4')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*([a-zA-Zа-яА-ЯёЁα-ωΑ-Ω0-9_]+)/g, 'sqrt($1)');
}

function tokenizeMath(str) {
    const s = preprocessMathString(str);
    const tokens = [];
    let i = 0;
    while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '^' || ch === '(' || ch === ')' || ch === ',' || ch === '=') {
        tokens.push({ type: 'op', val: ch });
        i++;
        continue;
    }
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] || ''))) {
        let numStr = '';
        while (i < s.length && /[0-9.]/.test(s[i])) numStr += s[i++];
        if (i < s.length && (s[i] === 'e' || s[i] === 'E')) {
        const next1 = s[i + 1] || '';
        const next2 = s[i + 2] || '';
        if (/[0-9]/.test(next1) || ((next1 === '+' || next1 === '-') && /[0-9]/.test(next2))) {
            numStr += s[i++];
            if (s[i] === '+' || s[i] === '-') numStr += s[i++];
            while (i < s.length && /[0-9]/.test(s[i])) numStr += s[i++];
        }
        }
        tokens.push({ type: 'num', val: numStr });
        continue;
    }
    if (/[a-zA-Zа-яА-ЯёЁα-ωΑ-ΩΔℏΦΓ_\{]/.test(ch)) {
        let idStr = '';
        while (i < s.length) {
        if (s[i] === '{') {
            while (i < s.length && s[i] !== '}') idStr += s[i++];
            if (i < s.length && s[i] === '}') idStr += s[i++];
        } else if (/[a-zA-Zа-яА-ЯёЁα-ωΑ-ΩΔℏΦΓ0-9_]/.test(s[i])) {
            idStr += s[i++];
        } else {
            break;
        }
        }
        tokens.push({ type: 'ident', val: idStr });
        continue;
    }
    tokens.push({ type: 'ident', val: ch });
    i++;
    }
    return tokens;
}

function parseMathToAST(str) {
    const tokens = tokenizeMath(str);
    let pos = 0;

    function peek() { return tokens[pos] || null; }
    function consume() { return tokens[pos++] || null; }

    function parseEquation() {
    const left = parseAddSub();
    if (peek() && peek().type === 'op' && peek().val === '=') {
        consume();
        const right = parseAddSub();
        return { type: 'eq', left, right };
    }
    return left;
    }

    function parseAddSub() {
    let node = parseMulDiv();
    while (peek() && peek().type === 'op' && (peek().val === '+' || peek().val === '-')) {
        const op = consume().val;
        const right = parseMulDiv();
        node = { type: 'binary', op, left: node, right };
    }
    return node;
    }

    function parseMulDiv() {
    let node = parseUnary();
    while (peek() && peek().type === 'op' && (peek().val === '*' || peek().val === '/')) {
        const op = consume().val;
        const right = parseUnary();
        node = { type: 'binary', op, left: node, right };
    }
    return node;
    }

    function parseUnary() {
    if (peek() && peek().type === 'op' && (peek().val === '-' || peek().val === '+')) {
        const op = consume().val;
        const arg = parseUnary();
        if (op === '+') return arg;
        return { type: 'unary', op: '-', arg };
    }
    return parsePower();
    }

    function parsePower() {
    let base = parsePrimary();
    if (peek() && peek().type === 'op' && peek().val === '^') {
        consume();
        const exp = parseUnary();
        return { type: 'pow', base, exp };
    }
    return base;
    }

    function parsePrimary() {
    const tok = peek();
    if (!tok) return { type: 'empty' };

    if (tok.type === 'op' && tok.val === '(') {
        consume();
        const inner = parseAddSub();
        if (peek() && peek().type === 'op' && peek().val === ')') consume();
        return { type: 'paren', expr: inner };
    }

    if (tok.type === 'num') {
        consume();
        return { type: 'num', val: tok.val };
    }

    if (tok.type === 'ident') {
        consume();
        if (peek() && peek().type === 'op' && peek().val === '(' && ALLOWED_FUNCTIONS.has(tok.val.toLowerCase())) {
        consume();
        const args = [];
        if (!(peek() && peek().type === 'op' && peek().val === ')')) {
            args.push(parseAddSub());
            while (peek() && peek().type === 'op' && peek().val === ',') {
            consume();
            args.push(parseAddSub());
            }
        }
        if (peek() && peek().type === 'op' && peek().val === ')') consume();
        return { type: 'func', name: tok.val.toLowerCase(), args };
        }
        return { type: 'ident', val: tok.val };
    }

    consume();
    return { type: 'ident', val: tok.val };
    }

    return parseEquation();
}

function unwrapParen(node) {
    while (node && node.type === 'paren') node = node.expr;
    return node;
}

function formatNumToLaTeX(valStr) {
    const m = String(valStr).match(/^(-?\d+(?:\.\d+)?)e([+-]?\d+)$/i);
    if (m) return `${m[1]} \\cdot 10^{${parseInt(m[2], 10)}}`;
    return valStr;
}

function astToLaTeX(node) {
    if (!node) return '';
    switch (node.type) {
    case 'empty':
        return '';
    case 'num':
        return formatNumToLaTeX(node.val);
    case 'ident':
        return formatIdentifierToLaTeX(node.val);
    case 'eq':
        return `${astToLaTeX(node.left)} = ${astToLaTeX(node.right)}`;
    case 'unary':
        return `-${astToLaTeX(node.arg)}`;
    case 'paren':
        return `\\left(${astToLaTeX(node.expr)}\\right)`;
    case 'pow': {
        let baseStr = astToLaTeX(node.base);
        if (node.base.type === 'binary' || node.base.type === 'unary' || node.base.type === 'pow') {
        baseStr = `\\left(${baseStr}\\right)`;
        }
        const expStr = astToLaTeX(unwrapParen(node.exp));
        return `${baseStr}^{${expStr}}`;
    }
    case 'binary': {
        if (node.op === '+') return `${astToLaTeX(node.left)} + ${astToLaTeX(node.right)}`;
        if (node.op === '-') return `${astToLaTeX(node.left)} - ${astToLaTeX(node.right)}`;
        if (node.op === '*') {
        const leftNode = (node.left.type === 'paren' && node.left.expr && node.left.expr.type === 'binary' && node.left.expr.op === '/') ? node.left.expr : node.left;
        const rightNode = (node.right.type === 'paren' && node.right.expr && node.right.expr.type === 'binary' && node.right.expr.op === '/') ? node.right.expr : node.right;
        return `${astToLaTeX(leftNode)} \\cdot ${astToLaTeX(rightNode)}`;
        }
        if (node.op === '/') {
        const num = astToLaTeX(unwrapParen(node.left));
        const den = astToLaTeX(unwrapParen(node.right));
        return `\\frac{${num}}{${den}}`;
        }
        return '';
    }
    case 'func': {
        const fn = node.name;
        const a0 = node.args[0] ? astToLaTeX(unwrapParen(node.args[0])) : '';
        const a1 = node.args[1] ? astToLaTeX(unwrapParen(node.args[1])) : '';
        if (fn === 'sqrt') return `\\sqrt{${a0}}`;
        if (fn === 'root') return `\\sqrt[${a0}]{${a1}}`;
        if (fn === 'log') return `\\log_{${a0}}\\left(${a1}\\right)`;
        if (fn === 'lg') return `\\lg\\left(${a0}\\right)`;
        if (fn === 'ln') return `\\ln\\left(${a0}\\right)`;
        if (fn === 'sin') return `\\sin\\left(${a0}\\right)`;
        if (fn === 'cos') return `\\cos\\left(${a0}\\right)`;
        if (fn === 'tan' || fn === 'tg') return `\\tan\\left(${a0}\\right)`;
        if (fn === 'ctg') return `\\cot\\left(${a0}\\right)`;
        if (fn === 'abs') return `\\left|${a0}\\right|`;
        if (fn === 'min') return `\\min\\left(${a0}, ${a1}\\right)`;
        if (fn === 'max') return `\\max\\left(${a0}, ${a1}\\right)`;
        return `${fn}\\left(${a0}\\right)`;
    }
    }
    return '';
}

function displayToLaTeX(str) {
    return astToLaTeX(parseMathToAST(str));
}

function convertToLaTeX(formula) {
    return astToLaTeX(parseMathToAST(formula));
}

function evalAST(node) {
    if (!node) return NaN;
    switch (node.type) {
    case 'num':
        return typeof node.numVal === 'number' ? node.numVal : parseFloat(node.val);
    case 'ident': {
        if (node.val === 'pi' || node.val === 'π') return Math.PI;
        if (PHYS_CONSTS[node.val] !== undefined) return PHYS_CONSTS[node.val];
        return NaN;
    }
    case 'paren':
        return evalAST(node.expr);
    case 'unary': {
        const v = evalAST(node.arg);
        return node.op === '-' ? -v : v;
    }
    case 'pow': {
        const b = evalAST(node.base);
        const e = evalAST(node.exp);
        return Math.pow(b, e);
    }
    case 'binary': {
        const l = evalAST(node.left);
        const r = evalAST(node.right);
        if (node.op === '+') return l + r;
        if (node.op === '-') return l - r;
        if (node.op === '*') return l * r;
        if (node.op === '/') return r === 0 ? (l === 0 ? NaN : Infinity * Math.sign(l || 1)) : l / r;
        return NaN;
    }
    case 'func': {
        const fn = node.name;
        const a0 = node.args[0] ? evalAST(node.args[0]) : NaN;
        const a1 = node.args[1] ? evalAST(node.args[1]) : NaN;
        if (fn === 'sqrt') return a0 < 0 ? NaN : Math.sqrt(a0);
        if (fn === 'root') return a0 === 0 ? NaN : (a1 < 0 && Math.abs(a0 % 2) === 1 ? -Math.pow(-a1, 1 / a0) : Math.pow(a1, 1 / a0));
        if (fn === 'log') return (a0 <= 0 || a0 === 1 || a1 <= 0) ? NaN : Math.log(a1) / Math.log(a0);
        if (fn === 'lg') return a0 <= 0 ? NaN : Math.log10(a0);
        if (fn === 'ln') return a0 <= 0 ? NaN : Math.log(a0);
        if (fn === 'sin') return Math.sin(a0);
        if (fn === 'cos') return Math.cos(a0);
        if (fn === 'tan' || fn === 'tg') return Math.tan(a0);
        if (fn === 'ctg') return 1 / Math.tan(a0);
        if (fn === 'abs') return Math.abs(a0);
        if (fn === 'min') return Math.min(a0, a1);
        if (fn === 'max') return Math.max(a0, a1);
        return NaN;
    }
    default:
        return NaN;
    }
}

function collectAndSimplifyFunctions(node, list) {
    if (!node) return node;
    if (node.type === 'func') {
    const newArgs = node.args.map(arg => collectAndSimplifyFunctions(arg, list));
    const updatedFunc = { ...node, args: newArgs };
    const val = evalAST(updatedFunc);
    const formatted = formatNumber(val);
    list.push({
        latex: astToLaTeX(updatedFunc),
        val,
        formatted
    });
    return { type: 'num', val: formatted, numVal: val };
    }
    if (node.type === 'paren') return { ...node, expr: collectAndSimplifyFunctions(node.expr, list) };
    if (node.type === 'unary') return { ...node, arg: collectAndSimplifyFunctions(node.arg, list) };
    if (node.type === 'pow') {
    return {
        ...node,
        base: collectAndSimplifyFunctions(node.base, list),
        exp: collectAndSimplifyFunctions(node.exp, list)
    };
    }
    if (node.type === 'binary') {
    return {
        ...node,
        left: collectAndSimplifyFunctions(node.left, list),
        right: collectAndSimplifyFunctions(node.right, list)
    };
    }
    return node;
}

let currentCategory = 'Все';
let searchQuery = '';
const catalogSearch = document.getElementById('catalogSearch');
const clearSearchBtn = document.getElementById('clearSearchBtn');

catalogSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
    renderCatalog();
});

clearSearchBtn.addEventListener('click', () => {
    catalogSearch.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    renderCatalog();
    catalogSearch.focus();
});

function renderCatalog() {
    const categoriesContainer = document.getElementById('catalogCategories');
    const gridContainer = document.getElementById('catalogGrid');
    const categories = ['Все', ...new Set(physicsFormulas.map(f => f.category))];
    categoriesContainer.innerHTML = categories.map(cat => {
    const count = cat === 'Все' ? physicsFormulas.length : physicsFormulas.filter(f => f.category === cat).length;
    const active = currentCategory === cat;
    return `
    <button class="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${active ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}" onclick="setCategory('${cat}')">
        <span>${cat}</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}">${count}</span>
    </button>`;
    }).join('');

    const filtered = physicsFormulas.filter(f => {
    const matchCat = currentCategory === 'Все' || f.category === currentCategory;
    const searchStr = `${f.title} ${f.description} ${f.formula} ${f.inputs.map(i => i.label).join(' ')}`.toLowerCase();
    return matchCat && searchStr.includes(searchQuery);
    });

    if (filtered.length === 0) {
    gridContainer.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 text-sm">По вашему запросу формулы не найдены</div>`;
    return;
    }

    gridContainer.innerHTML = filtered.map(f => {
    const latex = displayToLaTeX(f.formula);
    return `
    <div class="formula-card bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 cursor-pointer transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col h-full group" onclick='selectFormulaById("${f.id}")'>
        <div class="flex justify-between items-center mb-2.5 gap-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/70 px-2.5 py-1 rounded-md shrink-0 border border-brand-200/50 dark:border-brand-800/50">${f.category}</span>
        ${f.unit ? `<span class="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">${f.unit}</span>` : ''}
        </div>
        <h4 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">${f.title}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3.5 line-clamp-2 flex-grow">${f.description}</p>
        <div class="mt-auto bg-slate-50 dark:bg-slate-950/70 rounded-xl p-3 flex items-center justify-center overflow-x-auto custom-scrollbar border border-slate-100 dark:border-slate-800/80">
        <div class="math-render" data-latex="${escapeHtmlAttr(latex)}"></div>
        </div>
    </div>`;
    }).join('');

    renderCatalogMath();
}

function renderCatalogMath() {
    document.querySelectorAll('#catalogGrid .math-render').forEach(el => {
    if (window.katex) {
        try { katex.render(el.dataset.latex, el, { displayMode: true, throwOnError: false }); }
        catch (e) { el.textContent = el.dataset.latex; }
    } else {
        el.textContent = el.dataset.latex;
    }
    });
}

window.setCategory = function(cat) {
    currentCategory = cat;
    renderCatalog();
};

window.selectFormulaById = function(id) {
    const f = physicsFormulas.find(x => x.id === id);
    if (!f) return;
    activeFormula = f;
    state.variables = {};
    const parts = f.formula.split('=');
    if (parts.length >= 2) {
    targetVarInput.value = normalizeFormula(parts[0]);
    formulaInput.value = normalizeFormula(parts.slice(1).join('='));
    } else {
    formulaInput.value = normalizeFormula(f.formula);
    }
    extractTargetUnit(f);
    closeCatalog();
    onFormulaChange();
    scheduleHistorySave();
};

function extractTargetUnit(f) {
    targetUnit = (f && f.unit) ? f.unit : '';
}

function normalizeFormula(str) {
    return String(str)
    .replace(/·/g, '*').replace(/×/g, '*').replace(/÷/g, '/')
    .replace(/−/g, '-').replace(/–/g, '-')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4')
    .replace(/⁻¹/g, '^(-1)')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*([a-zA-Zа-яА-ЯёЁα-ωΑ-Ω0-9_]+)/g, 'sqrt($1)')
    .replace(/π/g, 'pi').replace(/Δ/g, 'd')
    .replace(/ℏ/g, 'hbar').replace(/Φ/g, 'Phi')
    .replace(/τ/g, 'tau').replace(/Γ/g, 'Gamma')
    .replace(/α/g, 'alpha').replace(/β/g, 'beta')
    .replace(/φ/g, 'phi').replace(/λ/g, 'lambda')
    .replace(/ν/g, 'nu').replace(/ρ/g, 'rho')
    .replace(/ε/g, 'eps').replace(/μ/g, 'mu')
    .replace(/ω/g, 'w').replace(/η/g, 'eta')
    .replace(/₁/g, '1').replace(/₂/g, '2')
    .replace(/₃/g, '3').replace(/₄/g, '4').replace(/₀/g, '0')
    .replace(/_\{([^}]+)\}/g, '$1')
    .replace(/_([a-zA-Zа-яА-ЯёЁ0-9]+)/g, '$1')
    .replace(/(?<![a-zA-Zа-яА-ЯёЁ0-9_])(\d+(?:\.\d+)?)([a-zA-Zа-яА-ЯёЁ_])/g, (match, p1, p2) =>
        p2.toLowerCase() === 'e' ? match : `${p1} * ${p2}`)
    .trim();
}

function extractUnitFromLabel(label) {
    const match = label.match(/\(([^)]+)\)$/);
    return match ? match[1] : '';
}

function extractCleanTitleFromLabel(label) {
    return label.replace(/\s*\([^)]+\)$/, '').trim();
}

function escapeRegex(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtmlAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function findInputData(varName, formulaObj) {
    if (!formulaObj || !formulaObj.inputs) return null;
    for (let inp of formulaObj.inputs) if (inp.id === varName) return inp;
    const normVar = varName.toLowerCase();
    const normVarNoU = normVar.replace(/_/g, '');
    for (let inp of formulaObj.inputs) {
    const idLower = inp.id.toLowerCase();
    const idNoU = idLower.replace(/_/g, '');
    if (idLower === normVar || idNoU === normVar || idNoU === normVarNoU) return inp;
    }
    for (let inp of formulaObj.inputs) {
    const re = new RegExp(`(?:^|[^a-zA-Zа-яА-ЯёЁ0-9_])${escapeRegex(varName)}(?=[^a-zA-Zа-яА-ЯёЁ0-9_]|$)`);
    if (re.test(inp.label)) return inp;
    }
    for (let inp of formulaObj.inputs) {
    let normLabel = inp.label
        .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/Δ/g, 'd').replace(/ℏ/g, 'hbar')
        .replace(/Φ/g, 'Phi').replace(/τ/g, 'tau').replace(/Γ/g, 'Gamma')
        .replace(/ω/g, 'w').replace(/ν/g, 'nu').replace(/λ/g, 'lambda')
        .replace(/ρ/g, 'rho').replace(/ε/g, 'eps').replace(/μ/g, 'mu')
        .replace(/φ/g, 'phi').replace(/α/g, 'alpha').replace(/β/g, 'beta')
        .replace(/π/g, 'pi').replace(/η/g, 'eta').replace(/_/g, '');
    const re = new RegExp(`(?:^|[^a-zA-Zа-яА-ЯёЁ0-9])${escapeRegex(normVarNoU)}(?=[^a-zA-Zа-яА-ЯёЁ0-9]|$)`, 'i');
    if (re.test(normLabel)) return inp;
    }
    return null;
}

function getAngleVars(formulaObj) {
    const set = new Set();
    if (!formulaObj || !formulaObj.inputs) return set;
    const greekMap = { 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'φ': 'phi', 'λ': 'lambda', 'ν': 'nu', 'ρ': 'rho', 'μ': 'mu', 'ω': 'omega' };
    for (const inp of formulaObj.inputs) {
    if (!inp.label) continue;
    if (/градус|\(°\)|\bdeg/i.test(inp.label)) {
        set.add(inp.id);
        const greekMatch = inp.label.match(/[αβγδφλνρμω]/);
        if (greekMatch && greekMap[greekMatch[0]]) set.add(greekMap[greekMatch[0]]);
    }
    }
    return set;
}

function checkAutoMatch() {
    const currentFormula = normalizeFormula(formulaInput.value).replace(/\s+/g, '');
    if (!currentFormula) {
    activeFormula = null;
    targetUnit = '';
    updateActiveFormulaBadge();
    return;
    }
    if (activeFormula) {
    const parts = activeFormula.formula.split('=');
    const rightSide = parts.length >= 2 ? parts.slice(1).join('=') : activeFormula.formula;
    if (normalizeFormula(rightSide).replace(/\s+/g, '') === currentFormula) {
        extractTargetUnit(activeFormula);
        updateActiveFormulaBadge();
        return;
    }
    }
    const matched = physicsFormulas.find(f => {
    const parts = f.formula.split('=');
    const rightSide = parts.length >= 2 ? parts.slice(1).join('=') : f.formula;
    return normalizeFormula(rightSide).replace(/\s+/g, '') === currentFormula;
    });
    if (matched) {
    activeFormula = matched;
    extractTargetUnit(matched);
    } else {
    activeFormula = null;
    targetUnit = '';
    }
    updateActiveFormulaBadge();
}

function updateActiveFormulaBadge() {
    if (!activeFormulaBadge) return;
    if (activeFormula) {
    activeFormulaBadge.textContent = `${activeFormula.category}: ${activeFormula.title}`;
    activeFormulaBadge.classList.remove('hidden');
    } else {
    activeFormulaBadge.classList.add('hidden');
    }
}

function checkForCommaDecimals(formula) {
    let cleaned = formula;
    while (/\([^()]*\)/.test(cleaned)) cleaned = cleaned.replace(/\([^()]*\)/g, '');
    const hasCommaOutsideFuncs = cleaned.includes(',');
    const hasCommaBetweenDigits = /\d+,\d+/.test(formula);
    let hasCommaInVars = false;
    const inputs = variablesContainer.getElementsByClassName('var-input');
    for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.includes(',')) { hasCommaInVars = true; break; }
    }
    decimalWarning.classList.toggle('hidden', !(hasCommaOutsideFuncs || hasCommaBetweenDigits || hasCommaInVars));
}

function validateFormulaSyntax(formula) {
    if (!formula) return null;
    if (/\d+,\d+/.test(formula)) return "Ошибка: Для десятичных дробей используйте точку (3.14).";
    let cleaned = formula;
    while (/\([^()]*\)/.test(cleaned)) cleaned = cleaned.replace(/\([^()]*\)/g, '');
    if (cleaned.includes(',')) return "Ошибка: Запятая допустима только внутри функций log(a, b) или root(n, x).";

    let openBrackets = 0;
    for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '(') openBrackets++;
    if (formula[i] === ')') openBrackets--;
    if (openBrackets < 0) return "Ошибка: Найдена лишняя закрывающая скобка ')'.";
    }
    if (openBrackets > 0) return "Ошибка: Несбалансированные скобки.";

    const words = formula.match(/[a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*/g) || [];
    const target = targetVarInput.value.trim() || 'y';
    for (let word of words) {
    if (word === 'pi') continue;
    const funcRegex = new RegExp(`(?:^|[^a-zA-Zа-яА-ЯёЁ0-9_])${escapeRegex(word)}\\s*\\(`, 'g');
    if (funcRegex.test(formula)) {
        if (!ALLOWED_FUNCTIONS.has(word.toLowerCase())) {
        return `Ошибка: Неизвестная функция "${word}".`;
        }
    } else {
        if (ALLOWED_FUNCTIONS.has(word.toLowerCase()) && word !== target) {
        return `Ошибка: Функция "${word}" должна вызываться со скобками.`;
        }
    }
    }

    const ast = parseMathToAST(formula);
    function checkAstFunctions(node) {
    if (!node) return null;
    if (node.type === 'func') {
        if (TWO_ARG_FUNCTIONS.has(node.name)) {
        if (node.args.length !== 2 || node.args[0].type === 'empty' || node.args[1].type === 'empty') {
            return `Ошибка в функции ${node.name}: требуется 2 аргумента через запятую.`;
        }
        } else if (node.args.length !== 1 || node.args[0].type === 'empty') {
        return `Ошибка в функции ${node.name}: укажите аргумент в скобках.`;
        }
        for (const a of node.args) {
        const err = checkAstFunctions(a);
        if (err) return err;
        }
    }
    if (node.type === 'paren') return checkAstFunctions(node.expr);
    if (node.type === 'unary') return checkAstFunctions(node.arg);
    if (node.type === 'pow') return checkAstFunctions(node.base) || checkAstFunctions(node.exp);
    if (node.type === 'binary') return checkAstFunctions(node.left) || checkAstFunctions(node.right);
    return null;
    }

    return checkAstFunctions(ast);
}

function extractVariables(formula, target) {
    const tokens = tokenizeMath(formula);
    const vars = new Set();
    for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.type === 'ident') {
        const isFuncCall = tokens[i + 1] && tokens[i + 1].type === 'op' && tokens[i + 1].val === '(' && ALLOWED_FUNCTIONS.has(tok.val.toLowerCase());
        if (!isFuncCall && !ALLOWED_FUNCTIONS.has(tok.val.toLowerCase()) && tok.val !== target && tok.val !== 'pi' && tok.val !== 'π') {
        vars.add(tok.val);
        }
    }
    }
    return Array.from(vars);
}

function parseUserNumber(raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim().replace(',', '.');
    if (!s) return NaN;
    if (/^-?\.\d+$/.test(s)) s = s.replace(/^(-?)\./, '$10.');
    else if (/^-?\d+\.$/.test(s)) s = s.replace(/\.$/, '');
    if (!/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) return NaN;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : NaN;
}

function renderVariableInputs() {
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    const currentVars = extractVariables(normalizeFormula(formulaInput.value), target);
    const newVarMap = {};
    currentVars.forEach(v => {
    let defaultVal = 1;
    if (PHYS_CONSTS[v] !== undefined) defaultVal = PHYS_CONSTS[v];
    if (v === 'x') defaultVal = 1;
    if (v === 'z') defaultVal = 17;
    if (activeFormula) {
        const inpData = findInputData(v, activeFormula);
        if (inpData) defaultVal = inpData.val;
    }
    newVarMap[v] = state.variables[v] !== undefined ? state.variables[v] : defaultVal;
    });
    state.variables = newVarMap;
    varsCount.textContent = `${currentVars.length} ${getNounPlural(currentVars.length, 'переменная', 'переменные', 'переменных')}`;

    if (currentVars.length === 0) {
    variablesContainer.innerHTML = `<div class="text-center py-8 text-slate-400 dark:text-slate-500 text-xs sm:text-sm">Переменные не обнаружены.<br>Введите формулу с переменными</div>`;
    return;
    }

    variablesContainer.innerHTML = currentVars.map(v => {
    let unit = '';
    let caption = '';
    if (activeFormula) {
        const inpData = findInputData(v, activeFormula);
        if (inpData) {
        unit = extractUnitFromLabel(inpData.label);
        caption = extractCleanTitleFromLabel(inpData.label);
        }
    }
    if (!unit && CONST_META[v]) unit = CONST_META[v].unit;
    if (!caption && CONST_META[v]) caption = CONST_META[v].label;

    const displayVal = state.variables[v];
    const varLatex = formatIdentifierToLaTeX(v);
    return `
    <div class="bg-slate-50/90 dark:bg-slate-950/60 p-2.5 sm:p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 transition-colors hover:border-brand-300 dark:hover:border-brand-800/60">
        ${caption ? `<div class="text-[11px] text-slate-500 dark:text-slate-400 mb-1 truncate font-medium">${caption}</div>` : ''}
        <div class="flex items-center justify-between gap-2">
        <label class="font-bold text-brand-600 dark:text-brand-400 math-font text-sm sm:text-base min-w-[2.2rem] flex items-center justify-between shrink-0">
            <span class="var-math-sym" data-latex="${escapeHtmlAttr(varLatex)}">${v}</span>
            <span class="text-slate-400 dark:text-slate-500 font-normal text-xs sm:text-sm ml-1">=</span>
        </label>
        <div class="relative w-full flex items-center">
            <input type="text" inputmode="decimal" data-var="${v}" value="${displayVal}" autocomplete="off" class="var-input w-full pl-3 ${unit ? 'pr-16' : 'pr-10'} py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white math-font text-left text-sm sm:text-base focus:ring-2 focus:ring-brand-500 outline-none transition-all">
            ${unit ? `<span class="absolute right-7 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium pointer-events-none select-none">${unit}</span>` : ''}
            <div class="absolute right-1 flex flex-col h-full justify-center space-y-0.5 pr-0.5">
            <button type="button" aria-label="Увеличить" class="btn-step-up text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1 rounded leading-none transition-colors touch-btn" data-var="${v}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path></svg>
            </button>
            <button type="button" aria-label="Уменьшить" class="btn-step-down text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1 rounded leading-none transition-colors touch-btn" data-var="${v}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            </div>
        </div>
        </div>
    </div>`;
    }).join('');

    if (window.katex) {
    variablesContainer.querySelectorAll('.var-math-sym').forEach(el => {
        try { katex.render(el.dataset.latex, el, { displayMode: false, throwOnError: false }); } catch (e) {}
    });
    }

    const debouncedCalc = debounce(() => {
    calculateResult();
    scheduleHistorySave();
    }, 60);
    variablesContainer.querySelectorAll('.var-input').forEach(input => {
    input.addEventListener('input', (e) => {
        const varName = e.target.dataset.var;
        const n = parseUserNumber(e.target.value);
        if (isNaN(n)) {
        e.target.classList.add('border-red-400', 'ring-1', 'ring-red-300');
        if (!e.target.dataset.shaken) {
            e.target.dataset.shaken = '1';
            e.target.classList.add('input-error');
            setTimeout(() => { e.target.classList.remove('input-error'); delete e.target.dataset.shaken; }, 400);
        }
        } else {
        e.target.classList.remove('border-red-400', 'ring-1', 'ring-red-300');
        state.variables[varName] = n;
        }
        checkForCommaDecimals(formulaInput.value);
        debouncedCalc();
    });
    });

    variablesContainer.querySelectorAll('.btn-step-up').forEach(btn => {
    btn.addEventListener('click', () => {
        const varName = btn.dataset.var;
        const input = variablesContainer.querySelector(`.var-input[data-var="${varName}"]`);
        const n = parseUserNumber(input.value);
        const val = parseFloat(((isNaN(n) ? 0 : n) + 1).toPrecision(12));
        input.value = val;
        input.classList.remove('border-red-400', 'ring-1', 'ring-red-300');
        state.variables[varName] = val;
        checkForCommaDecimals(formulaInput.value);
        calculateResult();
        scheduleHistorySave();
    }, { passive: true });
    });

    variablesContainer.querySelectorAll('.btn-step-down').forEach(btn => {
    btn.addEventListener('click', () => {
        const varName = btn.dataset.var;
        const input = variablesContainer.querySelector(`.var-input[data-var="${varName}"]`);
        const n = parseUserNumber(input.value);
        const val = parseFloat(((isNaN(n) ? 0 : n) - 1).toPrecision(12));
        input.value = val;
        input.classList.remove('border-red-400', 'ring-1', 'ring-red-300');
        state.variables[varName] = val;
        checkForCommaDecimals(formulaInput.value);
        calculateResult();
        scheduleHistorySave();
    }, { passive: true });
    });
}

function getNounPlural(number, one, two, five) {
    let n = Math.abs(number) % 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
}

function renderMathPreview(syntaxError) {
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    const rawFormula = formulaInput.value.trim();
    const normalized = normalizeFormula(rawFormula);
    if (syntaxError) {
    mathPreviewWrapper.className = "w-full min-h-[75px] sm:min-h-[85px] bg-red-50 dark:bg-red-950/40 rounded-xl p-3 sm:p-4 flex items-center justify-center overflow-x-auto border border-red-200 dark:border-red-800/60 transition-colors custom-scrollbar";
    mathPreview.innerHTML = `<span class="text-red-600 dark:text-red-400 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-1.5"><svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${syntaxError}</span>`;
    return;
    }
    mathPreviewWrapper.className = "w-full min-h-[75px] sm:min-h-[85px] bg-slate-50 dark:bg-slate-950/70 rounded-xl p-3 sm:p-4 flex items-center justify-center overflow-x-auto border border-slate-100 dark:border-slate-800/80 transition-colors custom-scrollbar";
    if (!rawFormula) {
    mathPreview.innerHTML = `<span class="text-slate-400 font-sans text-xs sm:text-sm">Введите формулу или выберите из базы...</span>`;
    return;
    }
    const latexExpr = `${formatIdentifierToLaTeX(target)} = ${convertToLaTeX(normalized)}`;
    if (window.katex) {
    try { katex.render(latexExpr, mathPreview, { displayMode: true, throwOnError: false }); }
    catch (e) { mathPreview.textContent = `${target} = ${rawFormula}`; }
    } else {
    mathPreview.textContent = `${target} = ${rawFormula}`;
    }
}

function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return 'Ошибка';
    if (!isFinite(num)) return 'Деление на ноль невозможно';
    if (num === 0) return '0';
    const abs = Math.abs(num);
    if (abs < 1e-4 || abs >= 1e10) {
    return num.toExponential(6).replace(/\.?0+e/, 'e').replace(/e\+?(-?)0*(\d)/, 'e$1$2');
    }
    if (Number.isInteger(num)) return num.toString();
    return parseFloat(num.toFixed(6)).toString();
}

function toLatexNumber(str) {
    const m = String(str).match(/^(-?\d+(?:\.\d+)?)e([+-]?\d+)$/i);
    if (m) return `${m[1]} \\times 10^{${parseInt(m[2], 10)}}`;
    return String(str);
}

function renderMathInSolution(container) {
    const root = container || solutionSteps;
    if (!window.katex) return;
    root.querySelectorAll('.math-inline').forEach(el => {
    if (el.dataset.rendered === '1') return;
    const latex = el.dataset.latex;
    if (!latex) return;
    try {
        katex.render(latex, el, { displayMode: false, throwOnError: false });
        el.dataset.rendered = '1';
    } catch (e) {
        el.textContent = latex;
    }
    });
}

function mathSpan(latex) {
    return `<span class="math-inline" data-latex="${escapeHtmlAttr(latex)}"></span>`;
}

function adjustResultFontSize() {
    if (!finalResult) return;
    const text = (finalResult.textContent || '').trim();
    const len = text.length;
    if (len === 0 || text === '—' || text === 'Ошибка') {
    finalResult.style.fontSize = '';
    finalResult.style.lineHeight = '';
    return;
    }
    let baseSize;
    if (len <= 6) baseSize = 36;
    else if (len <= 8) baseSize = 32;
    else if (len <= 10) baseSize = 28;
    else if (len <= 12) baseSize = 24;
    else if (len <= 15) baseSize = 22;
    else if (len <= 18) baseSize = 20;
    else if (len <= 22) baseSize = 18;
    else if (len <= 28) baseSize = 16;
    else if (len <= 36) baseSize = 14;
    else baseSize = 12;
    const isMobile = window.innerWidth < 640;
    const finalSize = isMobile ? Math.max(12, baseSize - 6) : baseSize;
    finalResult.style.fontSize = finalSize + 'px';
    finalResult.style.lineHeight = '1.15';
    finalResult.style.wordBreak = 'break-all';
}

function setErrorState(errorMessage) {
    solutionSteps.innerHTML = `<div class="text-red-500 font-semibold flex items-center gap-2 text-xs sm:text-sm"><svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${errorMessage}</div>`;
    resultBox.className = "order-1 md:order-2 md:col-span-5 lg:col-span-4 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden min-h-[160px] sm:min-h-[190px] h-auto shrink-0 lg:shrink";
    resultLabel.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-red-500"></span>Ошибка`;
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    targetVarBadge.textContent = `${target} =`;
    targetVarBadge.className = "px-2.5 py-0.5 sm:py-1 rounded-md bg-red-500/15 text-red-800 dark:text-red-300 font-mono font-bold text-xs sm:text-sm border border-red-500/20";
    finalResult.className = "text-lg sm:text-xl font-bold text-red-700 dark:text-red-300 mt-1 break-words";
    finalResult.textContent = "Ошибка";
    finalResult.style.fontSize = '';
    finalResult.style.lineHeight = '';
    resultUnitEl.textContent = "";
    document.getElementById('resultActionContainer').classList.add('hidden');
    const eHintBadge = document.getElementById('eHintBadge');
    if (eHintBadge) eHintBadge.classList.add('hidden');
    rawCalculatedValue = null;
}

function setSuccessState() {
    resultBox.className = "order-1 md:order-2 md:col-span-5 lg:col-span-4 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-900/20 dark:to-slate-900 border border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md min-h-[160px] sm:min-h-[190px] h-auto shrink-0 lg:shrink";
    resultLabel.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Результат`;
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    targetVarBadge.textContent = `${target} =`;
    if (window.katex) {
    try { katex.render(`${formatIdentifierToLaTeX(target)} =`, targetVarBadge, { displayMode: false, throwOnError: false }); } catch (e) {}
    }
    targetVarBadge.className = "px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs sm:text-sm border border-emerald-500/20";
    finalResult.className = "text-2xl sm:text-4xl font-extrabold text-emerald-900 dark:text-emerald-100 tracking-tight font-mono break-all drop-shadow-sm";
    finalResult.style.fontSize = '';
    finalResult.style.lineHeight = '';
    document.getElementById('resultActionContainer').classList.remove('hidden');
}

function updateResultDisplay() {
    if (rawCalculatedValue === null || isNaN(rawCalculatedValue)) return;
    const precision = precisionSelect.value;
    const abs = Math.abs(rawCalculatedValue);
    const isTinyOrHuge = abs !== 0 && (abs < 1e-4 || abs >= 1e10);
    let formattedVal;

    if (precision === '2') formattedVal = isTinyOrHuge ? rawCalculatedValue.toExponential(2) : parseFloat(rawCalculatedValue.toFixed(2)).toString();
    else if (precision === '4') formattedVal = isTinyOrHuge ? rawCalculatedValue.toExponential(4) : parseFloat(rawCalculatedValue.toFixed(4)).toString();
    else formattedVal = formatNumber(rawCalculatedValue);

    finalResult.textContent = formattedVal;
    resultUnitEl.textContent = targetUnit ? targetUnit : '';
    adjustResultFontSize();

    const eHintBadge = document.getElementById('eHintBadge');
    if (eHintBadge) {
    eHintBadge.classList.toggle('hidden', !formattedVal.includes('e'));
    }
}

function calculateResult() {
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    const targetLatex = formatIdentifierToLaTeX(target);
    const displayFormula = formulaInput.value.trim();
    const rawFormula = normalizeFormula(displayFormula);

    checkForCommaDecimals(rawFormula);
    const syntaxError = validateFormulaSyntax(rawFormula);
    renderMathPreview(syntaxError);

    if (syntaxError) {
    return setErrorState(syntaxError);
    }

    if (!rawFormula) {
    solutionSteps.innerHTML = '<div class="text-slate-400 text-sm">Введите формулу для расчёта</div>';
    finalResult.textContent = '—';
    resultUnitEl.textContent = '';
    setSuccessState();
    rawCalculatedValue = null;
    return;
    }

    try {
    const angleVars = getAngleVars(activeFormula);
    let substitutedStr = rawFormula;
    const sortedVars = Object.keys(state.variables).sort((a, b) => b.length - a.length);
    const anglesUsed = [];

    for (let i = 0; i < sortedVars.length; i++) {
        const v = sortedVars[i];
        const val = state.variables[v];
        let replacement;
        if (angleVars.has(v) && val !== 0) {
        replacement = `(${val} * pi / 180)`;
        anglesUsed.push(v);
        } else {
        replacement = val < 0 ? `(${val})` : String(val);
        }
        const regex = new RegExp(`(^|[^a-zA-Zа-яА-ЯёЁ0-9_])${escapeRegex(v)}(?=[^a-zA-Zа-яА-ЯёЁ0-9_]|$)`, 'g');
        substitutedStr = substitutedStr.replace(regex, `$1${replacement}`);
    }

    const substAst = parseMathToAST(substitutedStr);
    const fnList = [];
    const simplifiedAst = collectAndSimplifyFunctions(substAst, fnList);

    const stepHtml = [];

    stepHtml.push(
        `<div class="solution-line">` +
        `<span class="text-slate-400 font-semibold">1. Формула:</span> ` +
        mathSpan(`${targetLatex} = ${convertToLaTeX(rawFormula)}`) +
        `</div>`
    );

    const substLabel = anglesUsed.length > 0
        ? `2. Подстановка значений (углы ° → рад):`
        : `2. Подстановка значений:`;

    stepHtml.push(
        `<div class="solution-line">` +
        `<span class="text-slate-400 font-semibold">${substLabel}</span> ` +
        mathSpan(`${targetLatex} = ${astToLaTeX(substAst)}`) +
        `</div>`
    );

    let hasMathError = false;
    let stepCounter = 3;

    if (fnList.length > 0) {
        stepHtml.push(`<div class="text-brand-600 dark:text-brand-400 font-semibold mt-1">${stepCounter++}. Промежуточный расчёт функций:</div>`);
        for (let idx = 0; idx < fnList.length; idx++) {
        const item = fnList[idx];
        if (!isFinite(item.val) || isNaN(item.val)) hasMathError = true;
        const latexExpr = `${item.latex} = ${toLatexNumber(item.formatted)}`;
        stepHtml.push(
            `<div class="solution-line pl-2 sm:pl-3 text-[11px] sm:text-xs">` +
            `<span class="text-slate-400">• Шаг ${idx + 1}:</span> ` +
            mathSpan(latexExpr) +
            `</div>`
        );
        }
        if (simplifiedAst.type !== 'num') {
        stepHtml.push(
            `<div class="solution-line">` +
            `<span class="text-slate-400 font-semibold">${stepCounter++}. После вычисления функций:</span> ` +
            mathSpan(`${targetLatex} = ${astToLaTeX(simplifiedAst)}`) +
            `</div>`
        );
        }
    }

    const finalVal = evalAST(substAst);
    if (!isFinite(finalVal) || isNaN(finalVal)) hasMathError = true;
    if (hasMathError) {
        return setErrorState("Ошибка вычисления: Деление на ноль или недопустимый аргумент функции.");
    }

    rawCalculatedValue = finalVal;
    setSuccessState();

    const formattedFinalResult = formatNumber(finalVal);
    const unitHtml = targetUnit ? ` <span class="text-emerald-600 dark:text-emerald-400 font-bold">${targetUnit}</span>` : '';

    stepHtml.push(
        `<div class="solution-line">` +
        `<span class="text-slate-400 font-semibold">${stepCounter}. Итоговое вычисление:</span> ` +
        mathSpan(`${targetLatex} = \\mathbf{${toLatexNumber(formattedFinalResult)}}`) +
        unitHtml +
        `</div>`
    );

    solutionSteps.innerHTML = stepHtml.join('');
    renderMathInSolution(solutionSteps);

    if (!solutionModal.classList.contains('hidden')) openSolutionModal();
    updateResultDisplay();
    } catch (err) {
    setErrorState("Синтаксическая ошибка в формуле. Проверьте правильность расстановки операторов и скобок.");
    }
}

function onFormulaChange() {
    checkAutoMatch();
    renderVariableInputs();
    calculateResult();
}

document.getElementById('copyResultBtn').addEventListener('click', () => {
    const target = normalizeFormula(targetVarInput.value.trim()) || 'y';
    const val = finalResult.textContent;
    if (val === '—' || val === 'Ошибка') return;
    saveCurrentCalculationToHistory(true);
    const copyText = `${target} = ${val} ${targetUnit}`.trim();
    const btn = document.getElementById('copyResultBtn');
    const originalHtml = btn.innerHTML;
    const showSuccess = () => {
    btn.innerHTML = `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Скопировано!</span>`;
    btn.classList.replace('bg-emerald-600', 'bg-slate-800');
    btn.classList.replace('hover:bg-emerald-700', 'dark:bg-slate-700');
    setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.replace('bg-slate-800', 'bg-emerald-600');
        btn.classList.replace('dark:bg-slate-700', 'hover:bg-emerald-700');
    }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(copyText).then(showSuccess).catch(() => {
        try { const ta = document.createElement('textarea'); ta.value = copyText; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showSuccess(); } catch (e) {}
    });
    } else {
    try { const ta = document.createElement('textarea'); ta.value = copyText; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showSuccess(); } catch (e) {}
    }
}, { passive: true });

window.addEventListener('beforeunload', () => {
    const mainEl = document.querySelector('main');
    const catalogGrid = document.getElementById('catalogGrid');
    if (mainEl) sessionStorage.setItem('mainScrollTop', mainEl.scrollTop);
    if (catalogGrid) sessionStorage.setItem('catalogScrollTop', catalogGrid.scrollTop);
    sessionStorage.setItem('currentCategory', currentCategory);
    sessionStorage.setItem('searchQuery', catalogSearch.value);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedCategory = sessionStorage.getItem('currentCategory');
    if (savedCategory) currentCategory = savedCategory;

    const savedSearch = sessionStorage.getItem('searchQuery');
    if (savedSearch) {
    catalogSearch.value = savedSearch;
    searchQuery = savedSearch.toLowerCase();
    if (searchQuery.length > 0) clearSearchBtn.classList.remove('hidden');
    }

    updateHistoryBadge();
    onFormulaChange();

    if (localStorage.getItem('catalogOpen') === 'true') {
    toggleModal(catalogModal, true);
    renderCatalog();
    const catScroll = sessionStorage.getItem('catalogScrollTop');
    if (catScroll) {
        setTimeout(() => {
        document.getElementById('catalogGrid').scrollTop = parseInt(catScroll, 10);
        }, 0);
    }
    }

    const mainScroll = sessionStorage.getItem('mainScrollTop');
    if (mainScroll) {
    setTimeout(() => {
        document.querySelector('main').scrollTop = parseInt(mainScroll, 10);
    }, 0);
    }
});

window.addEventListener('load', () => {
    if (!catalogModal.classList.contains('hidden')) renderCatalogMath();
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => reg.update()).catch(() => {});
    }
});

let resultResizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(resultResizeTimer);
    resultResizeTimer = setTimeout(adjustResultFontSize, 120);
}, { passive: true });

if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) { refreshing = true; window.location.reload(); }
    });
}
