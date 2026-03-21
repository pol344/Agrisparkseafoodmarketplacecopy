import { useState } from 'react';
import { Fish, Plus, Edit2, Trash2, Package, BarChart3, User, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Product } from '../types';
import { toast } from 'sonner@2.0.3';

interface SellerDashboardProps {
  onSignOut: () => void;
}

export default function SellerDashboard({ onSignOut }: SellerDashboardProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tilapia',
      description: 'Farm-raised tilapia, freshly harvested.',
      price: 180,
      unit: 'per kg',
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800',
      farmName: 'My Aquafarm',
      location: 'San Fernando, Pampanga',
      stock: 150,
      category: 'Fish'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Fish',
    farmName: 'My Aquafarm',
    location: 'San Fernando, Pampanga'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Fish',
      farmName: 'My Aquafarm',
      location: 'San Fernando, Pampanga'
    });
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddDialog(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      farmName: product.farmName,
      location: product.location
    });
    setEditingProduct(product);
    setShowAddDialog(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      unit: 'per kg',
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800',
      farmName: formData.farmName,
      location: formData.location,
      stock: parseInt(formData.stock),
      category: formData.category
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      toast.success('Product updated successfully!');
    } else {
      setProducts([...products, productData]);
      toast.success('Product added successfully!');
    }

    setShowAddDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.stock * 0.1), 0); // Mock calculation

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="bg-white/95 backdrop-blur shadow-md max-w-md mx-auto m-3 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fish className="w-6 h-6 text-[#00796b]" />
              <div>
                <h1 className="text-[#00796b]">AgriSpark</h1>
                <p className="text-xs text-gray-600">Farmer Dashboard</p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#00796b] hover:bg-[#004d40] h-8"
              onClick={handleOpenAdd}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-3 pb-4">
        {/* Wallet Card */}
        <Card className="mb-4 bg-white/95 backdrop-blur shadow-md">
          <CardContent className="p-4 bg-[#e8f5e8]">
            <h3 className="text-[#00796b] mb-2">Wallet</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-600 mb-1">Products</p>
                <p className="text-xl text-[#00796b]">{products.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Stock</p>
                <p className="text-xl text-[#00796b]">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </p>
                <p className="text-xs text-gray-500">kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Revenue</p>
                <p className="text-lg text-[#00796b]">
                  ₱{(totalRevenue / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="mb-3">
          <h3 className="text-[#00796b]">My Products</h3>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <Card className="text-center py-8 bg-white/95 backdrop-blur shadow-md">
            <CardContent className="p-4">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h4 className="mb-1">No products yet</h4>
              <p className="text-sm text-gray-600 mb-3">Add your first seafood product</p>
              <Button size="sm" className="bg-[#00796b] hover:bg-[#004d40]" onClick={handleOpenAdd}>
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {products.map(product => (
              <Card key={product.id} className="bg-white/95 backdrop-blur shadow-md">
                <CardContent className="p-3 bg-[#e8f5e8]">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 overflow-hidden bg-gray-100 rounded-lg shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm line-clamp-1">{product.name}</h4>
                        <Badge variant="secondary" className="text-xs shrink-0 bg-[#00796b] text-white">{product.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-xs mb-2">
                        <span className="text-[#00796b]">₱{product.price}/kg</span>
                        <span className="text-gray-600">Stock: {product.stock} kg</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs border-[#00796b] text-[#00796b]"
                          onClick={() => handleOpenEdit(product)}
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto m-3">
          <div className="bg-white/95 backdrop-blur shadow-lg rounded-xl">
            <div className="grid grid-cols-3 h-16">
              <button className="flex flex-col items-center justify-center gap-1 text-[#00796b]">
                <Home className="w-5 h-5" />
                <span className="text-xs">Products</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1 text-gray-600">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs">Sales</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center gap-1 text-gray-600"
                onClick={onSignOut}
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Drawer */}
      <Drawer open={showAddDialog} onOpenChange={(open) => {
        setShowAddDialog(open);
        if (!open) resetForm();
      }}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DrawerTitle>
            <DrawerDescription>
              {editingProduct ? 'Update your product details' : 'Add a new seafood product to your inventory'}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <div>
              <Label htmlFor="name" className="text-sm">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Fresh Tilapia"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="price" className="text-sm">Price (₱/kg) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="180"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="stock" className="text-sm">Stock (kg) *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="150"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category" className="text-sm">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fish">Fish</SelectItem>
                  <SelectItem value="Shellfish">Shellfish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter className="pt-2 pb-4">
            <Button className="bg-[#00796b] hover:bg-[#004d40]" onClick={handleSave}>
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
            <Button variant="outline" className="border-[#00796b] text-[#00796b]" onClick={() => {
              setShowAddDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
