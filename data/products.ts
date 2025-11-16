import { Product } from '../types';

export const initialProducts: Product[] = [
    {
        id: 'p1',
        name: 'منتج جزائري رائع',
        price: 2500,
        image: 'https://placehold.co/600x400/3b82f6/FFFFFF?text=منتج+1',
        description: 'هذا وصف تجريبي للمنتج. هنا يمكنك وضع تفاصيل كاملة حول المنتج، مميزاته، والمواد المصنوع منها لتعريف العميل به بشكل أفضل.',
        quantity: 10
    },
    {
        id: 'p2',
        name: 'منتج مميز وعصري',
        price: 4200,
        image: 'https://placehold.co/600x400/4B5563/FFFFFF?text=منتج+2',
        description: 'وصف مفصل للمنتج المميز يبرز جودته العالية واستخداماته المتعددة التي تجعله الخيار الأول للعملاء الباحثين عن التميز.',
        quantity: 5
    },
    {
        id: 'p3',
        name: 'منتج أنيق وفاخر',
        price: 6000,
        image: 'https://placehold.co/600x400/10B981/FFFFFF?text=منتج+3',
        description: 'تصميم عصري وأنيق يواكب آخر صيحات الموضة. مصنوع من مواد عالية الجودة لضمان أفضل تجربة استخدام ممكنة.',
        quantity: 15
    },
    {
        id: 'p4',
        name: 'منتج تقليدي أصيل',
        price: 3500,
        image: 'https://placehold.co/600x400/F97316/FFFFFF?text=منتج+4',
        description: 'منتج فاخر يجمع بين الحرفية المتقنة والمواد النادرة. الخيار الأمثل لمن يبحث عن الفخامة والجودة التي لا تضاهى.',
        quantity: 0
    }
];
