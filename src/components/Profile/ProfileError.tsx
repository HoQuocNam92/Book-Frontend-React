import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const ProfileError = () => {
  return (
    <Card className="rounded-2xl">
      <CardTitle className="text-base flex items-center gap-2">
        <User className="h-5 w-5 text-orange-500" />

        Thông tin cá nhân
      </CardTitle>
      <CardContent>
        <p className="text-red-500">Lỗi khi tải thông tin cá nhân</p>
      </CardContent>
    </Card>
  )
}

export default ProfileError